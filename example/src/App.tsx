import React from 'react';
import { View } from 'react-native';
import Chat from './Chat';
import Completion from './Completion';

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
