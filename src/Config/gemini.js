/* const apiKey = "AIzaSyDGIw32RZbxFja8qObU5VXVX6DuAlyPth0"
 */
/*
  Important: You must install the SDK first:
  npm install @google/generative-ai
*/


 import { GoogleGenerativeAI } from "@google/generative-ai";

// Use the Lite model for the best free tier performance in late 2025
const MODEL_NAME = "gemini-2.5-flash-lite"; 
const API_KEY = "AIzaSyDGIw32RZbxFja8qObU5VXVX6DuAlyPth0";

async function run(prompt) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
        temperature: 1,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
    };

    try {
        const chat = model.startChat({
            generationConfig,
            history: [],
        });

        const result = await chat.sendMessage(prompt);
        // Ensure you await the response text properly
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Error: " + error.message;
    }
}

export default run; 
