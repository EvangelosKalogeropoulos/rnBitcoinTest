import { StyleSheet, ActivityIndicator, View } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

const ScreenLoader = ({ isLoading }) =>
  isLoading ? (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  ) : null;

export default ScreenLoader;
