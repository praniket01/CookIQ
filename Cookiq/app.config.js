
import 'dotenv/config';

export default ({ config }) => {
  return {
    ...config,
    extra: {
      EXPO_PUBLIC_GEMINI_API_KEY: process.env.GEMINI_API_KEY,
      apiKey: process.env.NEMBIUS_API_KEY,
      eas: {
        "projectId": "7e15d07a-16ce-4f99-8abe-16ec891239f9",
      },
      expo: {
        android: {
          package: "com.cookiq.app" 
        }
      }
    },
  };
};