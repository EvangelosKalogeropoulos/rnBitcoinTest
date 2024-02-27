import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

/**
 * Separator styles
 */
const styles = StyleSheet.create({
  separatorContainer: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    height: 2,
  },
});

/**
 * Renders the separator between flat list items.
 *
 * @returns {React.ReactElement}
 */
const Separator = () => <View style={styles.separatorContainer} />;

export default Separator;
