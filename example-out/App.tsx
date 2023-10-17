import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Chat from './Chat';
import Completion from './Completion';
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Chat />
      {/* <Completion /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
