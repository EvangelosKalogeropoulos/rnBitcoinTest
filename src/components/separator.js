import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  separatorContainer: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    height: 2,
  },
});

const Separator = () => <View style={styles.separatorContainer} />;

export default Separator;
