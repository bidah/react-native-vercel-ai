import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform } from 'react-native';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useChat } from 'react-native-vercel-ai';

const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit, data, isLoading } =
    useChat({
      api: 'http://openai-43.ngrok.io/api/chat',
    });
  return (
    <View
      className="flex flex-col w-full max-w-md py-24 mx-auto stretch"
      style={{ margin: 10 }}
    >
      {messages.length > 0
        ? messages.map((m) => (
            <Text
              key={m.id}
              className="whitespace-pre-wrap"
              style={{
                borderWidth: 1,
                borderColor: 'black',
                padding: 10,
                paddingHorizontal: 20,
                marginBottom: 5,
                marginHorizontal: 0,
                borderRadius: 5,
                color: 'black',
              }}
            >
              {m.role === 'user' ? '🧔 User: ' : '🤖 AI: '}
              {m.content}
            </Text>
          ))
        : null}

      {isLoading && Platform.OS !== 'web' && (
        <View style={{ marginVertical: 7, marginBottom: 12 }}>
          <Text>Loading...</Text>
        </View>
      )}
      <View style={{ width: '100%', flexDirection: 'row' }}>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: 'black',
            padding: 10,
            width: '80%',
            paddingHorizontal: 20,
            borderRadius: 5,
            marginRight: 3,
          }}
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-black-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChangeText={(e) => {
            handleInputChange(
              Platform.OS === 'web' ? { target: { value: e } } : e
            );
          }}
        />
        <Button onPress={handleSubmit} title="Send" />
      </View>
      <View
        style={{ height: 1, backgroundColor: 'gray', marginVertical: 25 }}
      />
    </View>
  );
};

export default Chat;
