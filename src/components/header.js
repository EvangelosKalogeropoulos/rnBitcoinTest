import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

/**
 * Header styles.
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0050B5',
    alignItems: 'center',
  },
  textButtonContainer: {
    flexDirection: 'row',
    padding: '2%',
  },
  text: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  lastUpdate: {
    fontSize: 15,
    color: '#000000',
    fontWeight: 'bold',
  },
});

/**
 * Renders the Header of the bitcoin prices screen.
 *
 * @param {String} lastUpdate - The last updated value.
 * @param {Function} onRefreshPress - The refresh action.
 * @returns {React.ReactElement}
 */
const Header = ({ lastUpdate, onRefreshPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.lastUpdate}>Last Update: {lastUpdate}</Text>
      <View style={styles.textButtonContainer}>
        <Text style={styles.text}>Bitcoin Prices</Text>
        <Button title="refresh" onPress={onRefreshPress} />
      </View>
    </View>
  );
};

export default Header;
