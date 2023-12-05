import React from 'react';
import {
  Platform,
  Button,
  Text,
  TextInput,
  View,
  Pressable,
} from 'react-native';
import { useChat } from 'react-native-vercel-ai';

const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: 'http://localhost:3000/api/chat',
    });
  return (
    <View style={{ margin: 10 }}>
      {messages.length > 0
        ? messages.map((m: any) => (
            <Text
              key={m.id}
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
          value={input}
          placeholder="Say something..."
          onChangeText={(e) => {
            return handleInputChange(
              Platform.OS === 'web' ? { target: { value: e } } : e
            );
          }}
        />
        <Pressable
          onPress={handleSubmit}
          style={{
            backgroundColor: 'skyblue',
            borderRadius: 5,
            color: 'black',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ color: 'white', fontWeight: '400' }}>Send</Text>
        </Pressable>
      </View>
      <View
        style={{ height: 1, backgroundColor: 'gray', marginVertical: 25 }}
      />
    </View>
  );
};

export default Chat;
