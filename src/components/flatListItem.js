import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LocalizedCurrency from '../formatters/localizedCurrency';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: '2%',
  },
  name: {
    flex: 1,
    alignSelf: 'flex-start',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
  },
  value: {
    alignSelf: 'flex-end',
  },
});

const FlatListItem = ({ name, value }) => (
  <View style={styles.container}>
    <Text style={styles.name}>{name}</Text>
    <LocalizedCurrency value={value} containerStyles={styles.value} />
  </View>
);

export default FlatListItem;
