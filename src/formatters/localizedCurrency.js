import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CURRENY_OPTIONS } from '../common/constants';

/**
 * Localize carrency styles.
 */
const styles = StyleSheet.create({
  text: {
    color: '#000000',
  },
});

/**
 * Function that returns formatted number with options.
 *
 * @param {Number} value - The value to format.
 * @param {Object} options - The options for decimals.
 * @returns
 */
const formatCurrency = (value, options = {}) => {
  const LOCALE_EN = 'en';

  return new Intl.NumberFormat(LOCALE_EN, options).format(value);
};

/**
 * Renders the localized currency.
 *
 * @param {Object} containerStyles
 * @param {Number} value - The value to format.
 * @param {Object} options - The options for decimals.
 * @returns {React.ReactElement}
 */
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
