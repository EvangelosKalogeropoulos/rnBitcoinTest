import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Constant that contains the currency conversions key in async storage.
 */
const CURRENCY_CONVERSIONS_KEY = 'currencyConversionsKey';

/**
 * Async function that performs the api call for currency conversions.
 * @returns {Promise}
 */
export default async from => {
  try {
    const api_key = 'a6d2b23eb2ae0f35e5b6aa0bff7541be101bccb6';
    const defaultAmount = 1;
    const storedCurrencyConversions = await AsyncStorage.getItem(
      CURRENCY_CONVERSIONS_KEY,
    );

    // Check for stored value.
    //This is an early return for api calls that we need the values once.
    if (storedCurrencyConversions) {
      return JSON.parse(storedCurrencyConversions);
    }

    const response = await fetch(
      `https://api.getgeoapi.com/v2/currency/convert?api_key=${api_key}&from=${from}&amount=${defaultAmount}&format=json`,
      { method: 'GET' },
    );
    const json = await response.json();
    await AsyncStorage.setItem(CURRENCY_CONVERSIONS_KEY, JSON.stringify(json));

    return json;
  } catch (error) {
    return error;
  }
};
