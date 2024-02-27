import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import React, { useEffect, useState, Fragment } from 'react';
import currencyConversionsListHandler from '../handlers/currencyConversionsListHandler';
import { useGenerator } from '../hooks/useGenerator';
import { CURRENCY_CODES } from '../common/constants';
import FlatListItem from '../components/flatListItem';
import Header from '../components/header';
import ScreenLoader from '../components/screenLoader';
import Separator from '../components/separator';
import Error from '../components/error';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const BitcoinPrices = () => {
  const [getCurrencyConversionList, isLoading, response, error] = useGenerator(
    currencyConversionsListHandler,
    { from: CURRENCY_CODES.EUR },
  );
  const [bitcoinList, setBitcoinList] = useState([]);
  const [lastUpdate, setLastUpdate] = useState('');

  useEffect(() => {
    getCurrencyConversionList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (response) {
      setBitcoinList(response.currencyValues);
      setLastUpdate(response.time.updated);
    }
  }, [response]);

  return (
    <SafeAreaView style={styles.container} isLoading={isLoading}>
      <ScreenLoader isLoading={isLoading} />
      {error ? (
        <Error
          errorValue={error.message}
          onRefreshPress={getCurrencyConversionList}
        />
      ) : (
        <Fragment>
          <Header
            lastUpdate={lastUpdate}
            onRefreshPress={getCurrencyConversionList}
          />
          <FlatList
            style={styles.container}
            data={bitcoinList}
            renderItem={({ item: { currencyName, rate } }) => (
              <FlatListItem name={currencyName} value={rate} />
            )}
            keyExtractor={({ currencyName }) => currencyName}
            ItemSeparatorComponent={Separator}
          />
        </Fragment>
      )}
    </SafeAreaView>
  );
};

export default BitcoinPrices;
