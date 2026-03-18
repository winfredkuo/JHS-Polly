import { GoogleGenAI, Type } from "@google/genai";
import { db, auth } from "../firebase";
import { doc, getDoc, setDoc, increment } from "firebase/firestore";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export interface AIExplanation {
  word: string;
  partOfSpeech: string;
  forms: Record<string, string>;
  examples: {
    type: 'dialogue' | 'reading';
    en: string;
    zh: string;
  }[];
  synonyms: string[];
  antonyms: string[];
}

export async function getVocabExplanation(word: string): Promise<AIExplanation> {
  // 1. Check Cache
  const cacheRef = doc(db, 'vocab_cache', word.toLowerCase().replace(/\s+/g, '_'));
  const cacheSnap = await getDoc(cacheRef);
  
  if (cacheSnap.exists()) {
    return cacheSnap.data().explanation as AIExplanation;
  }

  // 2. Check Usage Limit
  const user = auth.currentUser;
  if (!user) throw new Error('請先登入以使用 AI 功能');

  const today = new Date().toISOString().split('T')[0];
  const usageRef = doc(db, `users/${user.uid}/usage`, today);
  const usageSnap = await getDoc(usageRef);
  
  const currentUsage = usageSnap.exists() ? usageSnap.data().count : 0;
  if (currentUsage >= 30) {
    throw new Error('今日 AI 額度已達上限，明天再繼續深造吧！');
  }

  // 3. Call Gemini 1.5 Flash
  const prompt = `
    你是一位專業的英文老師，請為國中會考學生解釋單字或片語 "${word}"。
    難度控制在全民英檢 (GEPT) 中級至中高級。
    請提供以下資訊：
    1. 詞性 (partOfSpeech)。
    2. 如果是動詞，提供動詞三態 (present, past, pastParticiple)；如果是名詞，提供單複數 (singular, plural)。
    3. 兩個例句：一個是生活對話形式 (dialogue)，一個是具挑戰性的閱讀測驗形式 (reading)。皆須附上中英對照。
    4. 列出相關單字：同義詞 (synonyms) 與反義詞 (antonyms)。
    
    請嚴格以 JSON 格式回傳。
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          word: { type: Type.STRING },
          partOfSpeech: { type: Type.STRING },
          forms: { 
            type: Type.OBJECT,
            additionalProperties: { type: Type.STRING }
          },
          examples: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING, enum: ['dialogue', 'reading'] },
                en: { type: Type.STRING },
                zh: { type: Type.STRING }
              },
              required: ['type', 'en', 'zh']
            }
          },
          synonyms: { type: Type.ARRAY, items: { type: Type.STRING } },
          antonyms: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ['word', 'partOfSpeech', 'forms', 'examples', 'synonyms', 'antonyms']
      }
    }
  });

  const explanation = JSON.parse(response.text || '{}') as AIExplanation;

  // 4. Update Cache and Usage
  await setDoc(cacheRef, {
    word,
    explanation,
    createdAt: new Date().toISOString()
  });

  await setDoc(usageRef, {
    count: increment(1)
  }, { merge: true });

  return explanation;
}
