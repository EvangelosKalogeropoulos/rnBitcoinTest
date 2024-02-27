export default async () => {
  try {
    const response = await fetch(
      'https://api.coindesk.com/v1/bpi/currentprice.json',
      { method: 'GET' },
    );
    const json = await response.json();

    return json;
  } catch (error) {
    return error;
  }
};
