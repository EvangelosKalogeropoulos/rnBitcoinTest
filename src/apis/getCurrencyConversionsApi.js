import AsyncStorage from '@react-native-async-storage/async-storage';

const CURRENCY_CONVERSIONS_KEY = 'currencyConversionsKey';

export default async from => {
  try {
    const api_key = 'a6d2b23eb2ae0f35e5b6aa0bff7541be101bccb6';
    const defaultAmount = 1;
    const storedCurrencyConversions = await AsyncStorage.getItem(
      CURRENCY_CONVERSIONS_KEY,
    );

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
