import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';

/**
 * Error styles.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000000',
  },
  errorContent: {
    fontSize: 16,
    color: '#000000',
    paddingBottom: '5%',
  },
});

/**
 * Renders the error screen when something goes wrong with the api calls.
 *
 * @param {String} errorValue - The current error value.
 * @param {Function} onRefreshPress - The refresh action.
 * @returns {React.ReactElement}
 */
const Error = ({ errorValue, onRefreshPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorTitle}>An error occurred!</Text>
      <Text style={styles.errorContent}>{errorValue}</Text>
      <Button title="refresh" onPress={onRefreshPress} />
    </View>
  );
};

export default Error;
