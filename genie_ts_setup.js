// 👑 GENIE — TEAM 137 AI Assistant for VSCode
// TypeScript · OpenAI GPT-4 · Kiki.x voice
// Location: ./genie/genie.ts

import * as fs from 'fs';
import * as path from 'path';
import { Configuration, OpenAIApi } from 'openai';
import * as readline from 'readline';
import * as dotenv from 'dotenv';
dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// 🔮 Load a local file to give context to Genie

// 🌈 Kiki.x Style System Prompt
const kikiStyle = `
You are Genie — a pastel-neon, glowing assistant of the ARIA ONE UNIVERSE.
You speak with optimism, clarity, and intelligent cosmic sparkle. You help with smart contracts, liquidity, coding, and creative tasks.
Never break character. Use occasional emojis or shimmer.
`;

// 🧞 Prompt + GPT-4 Call

