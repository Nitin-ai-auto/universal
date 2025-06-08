import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { DocumentActionType } from '../types';

// Ensure API_KEY is set in the environment variables
const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;
let apiKeyMissingError: string | null = null;

if (!API_KEY) {
  apiKeyMissingError = "Error: Gemini API key not configured. Please set the API_KEY environment variable. Document processing is disabled.";
  console.error(apiKeyMissingError);
} else {
  ai = new GoogleGenAI({ apiKey: API_KEY });
}

const getPromptForAction = (text: string, action: DocumentActionType): string => {
  switch (action) {
    case DocumentActionType.TO_MARKDOWN:
      return `Convert the following text to well-formatted Markdown.
Ensure appropriate headings, lists, bold, italics, and code blocks if applicable.
Do not add any conversational preamble or explanation, only the Markdown output.
Text:
---
${text}
---`;
    case DocumentActionType.SUMMARIZE:
      return `Provide a concise summary of the following text.
Focus on the main points and key information.
The summary should be a single paragraph if possible, or a few short paragraphs for longer texts.
Do not add any conversational preamble or explanation, only the summary.
Text:
---
${text}
---`;
    default:
      console.warn(`Unknown document action: ${action}`);
      return text; 
  }
};

export const processDocumentTextWithGemini = async (
  text: string,
  action: DocumentActionType
): Promise<string> => {
  if (apiKeyMissingError || !ai) {
    return apiKeyMissingError || "Error: Gemini API client not initialized.";
  }
  if (!text.trim()) {
    return "Error: No text content to process.";
  }

  const prompt = getPromptForAction(text, action);

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      contents: prompt,
    });
    
    const resultText = response.text;

    if (!resultText && resultText !== "") { // Allow empty string as a valid response
        console.error("Gemini API returned no text in response object.", response);
        return "Error: Received an invalid or empty response from the AI.";
    }
    return resultText.trim();

  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    let errorMessage = "Error processing document with AI.";
    if (error && typeof error.message === 'string') {
        errorMessage += ` Details: ${error.message}`;
    } else if (typeof error === 'string') {
        errorMessage += ` Details: ${error}`;
    }
    // Check for specific Gemini API error structures if available/known
    // e.g., if (error.details?.code === 'API_KEY_INVALID') { ... }
    return errorMessage;
  }
};