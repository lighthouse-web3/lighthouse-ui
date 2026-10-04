import { agentLogos } from "./agentLogos";

// Positions are percentages of the interactive canvas, not screen pixels.
export const agents = [
  { name: "ChatGPT", id: "openai", x: 25, y: 21 },
  { name: "Claude", id: "claude", x: 43, y: 10 },
  { name: "Gemini", id: "gemini", x: 66, y: 16 },
  { name: "Llama", id: "meta", x: 83, y: 29 },
  { name: "DeepSeek", id: "deepseek", x: 89, y: 52 },
  { name: "Mistral", id: "mistral", x: 79, y: 76 },
  { name: "Qwen", id: "qwen", x: 62, y: 88 },
  { name: "Grok", id: "grok", x: 42, y: 88 },
  { name: "Perplexity", id: "perplexity", x: 22, y: 79 },
  { name: "Copilot", id: "copilot", x: 10, y: 58 },
  { name: "Cohere", id: "cohere", x: 12, y: 34 },
  { name: "Hugging Face", id: "huggingface", x: 32, y: 49 },
  { name: "Ollama", id: "ollama", x: 69, y: 51 },
  { name: "Cursor", id: "cursor", x: 56, y: 30 },
  { name: "LangChain", id: "langchain", x: 48, y: 70 },
  { name: "CrewAI", id: "crewai", x: 92, y: 16 },
  { name: "Muse AI", id: "muse", x: 25, y: 64 },
].map((agent) => ({ ...agent, logo: agentLogos[agent.name] }));
