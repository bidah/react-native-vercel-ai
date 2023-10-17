import React from 'react';
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Chat from './Chat';
import Completion from './Completion';
// import Completion from './Completion';
export default function App() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Chat />
      <Completion />
    </View>
  );
}
