import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

/**
 * Empty list view styles.
 */
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000000',
  },
});

/**
 * Renders the empty list view.
 *
 * @returns {React.ReactElement}
 */
const EmptyListView = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>The list is empty!</Text>
    </View>
  );
};

export default EmptyListView;
