# react-native-vercel-ai

Run [Vercel AI package](npmjs.com/package/ai) on React Native, [Expo](http://www.expo.dev), Web and Universal apps.

Currently React Native fetch API does not support streaming which is used as a default on Vercel AI. This package enables you to use AI library on React Native but the best usage is when used on Expo universal native apps.

On mobile you get back responses without streaming with the same API of `useChat` and `useCompletion` and on web it will fallback to `ai/react`

## Installation

```sh
npm install react-native-vercel-ai
```

## Peer dependencies

```sh
npm install swr ai
```

## Usage

Two steps

### 1. On React Native app

On your React Native app import `useChat` or `useCompletion` from `react-native-vercel-ai`. Same API as Vercel AI library.

```js
import { useChat } from 'react-native-vecel-ai';

const { messages, input, handleInputChange, handleSubmit, data, isLoading } =
  useChat({
    api: 'http://localhost:3001/api/chat',
  });

<View>
  {messages.length > 0
    ? messages.map((m) => (
        <Text key={m.id}>
          {m.role === 'user' ? '🧔 User: ' : '🤖 AI: '}
          {m.content}
        </Text>
      ))
    : null}

  {isLoading && Platform.OS !== 'web' && (
    <View>
      <Text>Loading...</Text>
    </View>
  )}
  <View>
    <TextInput
      value={input}
      placeholder="Say something..."
      onChangeText={(e) => {
        handleInputChange(Platform.OS === 'web' ? { target: { value: e } } : e);
      }}
    />
    <Button onPress={handleSubmit} title="Send" />
  </View>
</View>;
```

### 2. On your API endpoint

**This example is using a Next.js API but you could use another type of API setup**

Setup your responses depending of weather the request is coming from native mobile or the web.

**For web:**

- Follow normal AI library flows for web

**For React Native:**

- skip the `OpenAIStream` part of the web flow. We don't want the stream.
- Set your provider stream option to be `false`.
- return a response that has the latest message.

```js
// /api/chat

// ./app/api/chat/route.ts
import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse, userAgent } from 'next/server';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request, res: Response) {
  // Extract the `prompt` from the body of the request
  const { messages } = await req.json();
  const userAgentData = userAgent(req);
  const isNativeMobile = userAgentData.ua?.includes('Expo');

  if (!isNativeMobile) {
    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages,
    });
    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
    // Respond with the stream
    return new StreamingTextResponse(stream);
  } else {
    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      // Set your provider stream option to be `false` for native
      stream: false,
      messages: messages,
    });

    return NextResponse.json({ data: response.choices[0].message });
  }
}
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## About Author

### Rodrigo Figueroa

Follow Rodrigo Figueroa, creator of `react-native-vercel-ai` on Twitter: [@bidah](https://twitter.com/bidah)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
