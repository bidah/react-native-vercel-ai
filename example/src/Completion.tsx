import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useCompletion } from 'react-native-vercel-ai';

const Completion = () => {
  const {
    completion,
    input,
    handleInputChange,
    handleSubmit,
    stop,
    isLoading,
  } = useCompletion({
    api: 'http://localhost:3001/api/chat',
  });

  return (
    <View style={{ margin: 10 }}>
      <View style={{ width: '100%', flexDirection: 'row' }}>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: 'black',
            padding: 10,
            width: '67%',
            paddingHorizontal: 20,
            borderRadius: 5,
            marginRight: 3,
          }}
          value={input}
          placeholder="Say something..."
          onChangeText={(e) => {
            console.log('🚀 ~ file: Completion.tsx:43 ~ Completion ~ e:', e);

            handleInputChange(
              Platform.OS === 'web' ? { target: { value: e } } : e
            );
          }}
        />
        <Button onPress={handleSubmit} title="Send" />
        <Button onPress={stop} title="Stop" />
      </View>

      <View>
        {isLoading && Platform.OS !== 'web' ? (
          <View style={{ marginVertical: 7, marginBottom: 12 }}>
            <Text>Loading...</Text>
          </View>
        ) : (
          <View style={{ marginVertical: 7, marginBottom: 12 }}>
            <Text>Completion result: {completion}</Text>
          </View>
        )}
      </View>
      <View
        style={{ height: 1, backgroundColor: 'gray', marginVertical: 25 }}
      />
    </View>
  );
};

export default Completion;
