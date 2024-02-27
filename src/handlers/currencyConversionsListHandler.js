import getBTCcurrentPriceApi from '../apis/getBTCcurrentPriceApi';
import getCurrencyConversionsApi from '../apis/getCurrencyConversionsApi';

const resolveEuroRate = (bpi, currency) => {
  const { rate_float } = Object.values(bpi).find(
    ({ code }) => code === currency,
  );

  return rate_float;
};

const transformCurrencyValues = (rates, value) =>
  Object.values(rates).map(({ currency_name, rate }) => ({
    currencyName: currency_name,
    rate: Number(rate) * value,
  }));

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
