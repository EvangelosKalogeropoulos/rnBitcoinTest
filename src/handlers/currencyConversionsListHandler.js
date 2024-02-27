import getBTCcurrentPriceApi from '../apis/getBTCcurrentPriceApi';
import getCurrencyConversionsApi from '../apis/getCurrencyConversionsApi';

/**
 * Helper function to resolve the EUR rate.
 *
 * @param {Object} bpi - The bpi values.
 * @param {String} currency - The current currency.
 * @returns {Number}
 */
const resolveEuroRate = (bpi, currency) => {
  const { rate_float } = Object.values(bpi).find(
    ({ code }) => code === currency,
  );

  return rate_float;
};

/**
 * Helper function that transform the currency values.
 *
 * @param {Array.<Object>} rates - The array of currency rates.
 * @param {Number} value - The current rate.
 * @returns {Array.<Object>}
 */
const transformCurrencyValues = (rates, value) =>
  Object.values(rates).map(({ currency_name, rate }) => ({
    currencyName: currency_name,
    rate: Number(rate) * value,
  }));

/**
 * Async function to handle the api calls and returns
 * either an object with time and currency values or throw the error for generator.
 *
 * @param {String} from - The currency for conversions.
 * @returns {Object}
 * @throws {Error}
 */
export default async ({ from }) => {
  try {
    const { bpi, time } = await getBTCcurrentPriceApi();
    const { rates } = await getCurrencyConversionsApi(from);
    const currencyValues = transformCurrencyValues(
      rates,
      resolveEuroRate(bpi, from),
    );

    return { time, currencyValues };
  } catch (error) {
    throw error;
  }
};
