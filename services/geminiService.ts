
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

export const getTechnicalAdvice = async (query: string, history: { role: 'user' | 'assistant', content: string }[]) => {
  if (!API_KEY) return "Technical assistance is currently offline (API key missing).";

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  try {
    const chatHistory = history.map(h => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.content }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...chatHistory,
        { role: 'user', parts: [{ text: query }] }
      ],
      config: {
        systemInstruction: `You are an expert industrial engineering consultant for Allied Industrial Parts. 
        Help users find the right parts based on their technical needs. 
        Focus on specifications, material compatibility, and ANSI/ISO standards. 
        Be professional, concise, and helpful. 
        If you don't know the exact SKU, describe the type of product they need.`,
      }
    });

    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The industrial assistant is experiencing technical difficulties. Please try again later.";
  }
};

export const searchProductsSmart = async (query: string) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Search query: "${query}". Based on this industrial part query, identify the core category and key technical specs a user would look for. Return a brief JSON object.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING },
            technicalSpecs: { type: Type.ARRAY, items: { type: Type.STRING } },
            suggestions: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["category", "technicalSpecs"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    return null;
  }
};
