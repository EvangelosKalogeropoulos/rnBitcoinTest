import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CURRENY_OPTIONS } from '../common/constants';

const styles = StyleSheet.create({
  text: {
    color: '#000000',
  },
});

const formatCurrency = (value, options = {}) => {
  const LOCALE_EN = 'en';

  return new Intl.NumberFormat(LOCALE_EN, options).format(value);
};

const LocalizedCurrency = ({
  containerStyles = {},
  value,
  options = CURRENY_OPTIONS.MINIMUM_TWO_MAXIMUM_FOUR_DECIMAL_PLACES,
}) => (
  <View style={containerStyles}>
    <Text style={styles.text}>{formatCurrency(value, options)}</Text>
  </View>
);

export default LocalizedCurrency;
