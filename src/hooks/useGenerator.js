import { useRef, useCallback, useState, useEffect } from 'react';
import isDeepEqual from 'fast-deep-equal/react';

function* generatorFunction(callback, args) {
  return yield callback(...args);
}

/**
 * Invokes the provided generator function with the provided args and iterates the created
 * generator object until its completion, returning the final execution result.
 *
 * @param {function(...*): Generator} generatorFunction - The generator function to run.
 * @param {...*} args=[] - The arguments to pass to the generator.
 * @returns {Promise<null>}
 * @throws {Error}
 */
const runGenerator = async (callback, args) => {
  let result = { value: null, done: false };
  const generator = generatorFunction(callback, args);

  while (!result.done) {
    result = generator.next(result.value);
    // This "await" in loop is intentional ...
    // eslint-disable-next-line no-await-in-loop
    result.value = await result.value;
  }

  return result.value;
};

/**
 * Custom react hook for invoking a generator function on demand.
 * The hook returns an array with the following elements per position:
 * [
 *    execute: A callback for running the provided generation,
 *    executing: A boolean indicating whether the generation is running or not,
 *    executionResult: The result returned from the generation on successful completion,
 *    executionError: The error occurred/thrown in case of generation execution failure
 * ]
 *
 * @param {function(...*): Generator} generatorFunction - The generator function.
 * @param {...*} args=[] - The arguments to pass to the generator on invocation.
 * @returns {Array.<*>}
 */
const useGenerator = (callback, ...args) => {
  // Handle memoization of the provided args.
  const argsRef = useRef(args);
  if (!argsRef.current || !isDeepEqual(argsRef.current, args)) {
    argsRef.current = args;
  }

  // Handle mounting/unmounting of the component.
  // This is used for preventing state updates when component is not mounted.
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const updateState = (stateUpdater, ...updaterArgs) => {
    if (mounted) {
      stateUpdater(...updaterArgs);
    }
  };

  // Internal state for handling progress and results.
  const [executing, setExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);
  const [executionError, setExecutionError] = useState(null);

  // Create a callback that will run the generator when invoked and update the internal state.
  const execute = useCallback(async () => {
    try {
      if (executing) {
        return;
      }
      updateState(setExecuting, true);
      updateState(setExecutionResult, null);
      updateState(setExecutionError, null);

      const result = await runGenerator(callback, args);
      updateState(setExecutionResult, result);
    } catch (error) {
      updateState(setExecutionError, error);
    } finally {
      updateState(setExecuting, false);
    }
    // Re-create the callback only when the provided args change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [argsRef.current]);

  return [
    execute,
    executing,
    executionResult,
    executionError,
    !!executing || (!executionResult && !executionError),
  ];
};

export { useGenerator };
