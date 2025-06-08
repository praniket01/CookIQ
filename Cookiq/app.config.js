
import 'dotenv/config';

export default ({ config }) => {
  return {
    ...config,
    extra: {
      EXPO_PUBLIC_GEMINI_API_KEY: process.env.GEMINI_API_KEY,
      apiKey: process.env.NEMBIUS_API_KEY,
    },
  };
};