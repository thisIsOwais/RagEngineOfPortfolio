// ragEngine.js
import { contentLoader } from "./loader.js";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { AzureOpenAIEmbeddings, AzureChatOpenAI } from "@langchain/openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";

import dotenv from "dotenv";
dotenv.config();

let retriever, ragChain;

export const initRag = async () => {
  const content = await contentLoader();
  const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });
  const splitDocs = await splitter.splitDocuments(content);
  console.log("✅ Split into", splitDocs.length, "chunks");

  const embeddings = new AzureOpenAIEmbeddings({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_EMBEDDIN_KEY,
    azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_DEPLOYMENT,
    azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_EMBEDDING_VERSION,
    azureOpenAIApiInstanceName: new URL(process.env.AZURE_OPENAI_ENDPOINT).hostname.split(".")[0]
  });

 
  const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
  const index = pc.Index("ghostme-index");

  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex: index,
    maxConcurrency: 5
  });

  await vectorStore.addDocuments(splitDocs);

  retriever = vectorStore.asRetriever({ k: 3 });

  const llm = new AzureChatOpenAI({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_KEY,
    azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_LLM_DEPLOYMENT,
    azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_VERSION,
    azureOpenAIApiInstanceName: new URL(process.env.AZURE_OPENAI_ENDPOINT).hostname.split(".")[0],
    temperature: 0.3,
  });



  const customTemplate = `You are an assistant trained on Owais's portfolio information.
Use the context provided below to help answer the user's question as best you can.
Assume that you are Owais replying on the behalf of him, give response as you are talking with recrutier, this should be end to end communication style.
If the answer is not in the context, it's okay to say you don’t know.

Context:
{context}

Question: {question}

Answer:
`;

  const prompt = PromptTemplate.fromTemplate(customTemplate);

  ragChain = await createStuffDocumentsChain({
    llm,
    prompt,
    outputParser: new StringOutputParser(),
  });

  console.log("✅ RAG system initialized.");
};


const buildSSML = (text) => {
  return `<speak>${text}</prosody</speak>`;
};

const getAzureTTS = async (text) => {
  try {
    const TTSKey = process.env.AZURE_TTS_KEY;
    const endpoint =process.env.AZURE_TTS_ENDPOINT;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TTSKey}`,
      },
      body: JSON.stringify({
        model: "tts-hd",
        input: buildSSML(text), // ✅ SSML string directly
        voice: "alloy",
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Azure TTS error:", errorText);
      return { error: "Azure TTS request failed" }; // ✅ no res.status
    }

    const audioBuffer = await res.arrayBuffer();
    return audioBuffer;
  } catch (err) {
    console.error("TTS Fetch Error:", err.message);
    return { error: "TTS synthesis failed" };
  }
};

export const getRagResponse = async (userQuery, res) => {
  if (!retriever || !ragChain) throw new Error("RAG system not initialized");

  const contextDocs = await retriever.invoke(userQuery);

  //streaming response chunk by chunk

  let buffer = '';
  for await (const chunk of ragChain._streamIterator({ question: userQuery, context: contextDocs })) {
    buffer += chunk;
    console.log("Chunk:", chunk);


    // Sentence boundary detection (you can improve this with better NLP later)
    if (/[.?!]\s*$/.test(buffer)) {
      const sentence = buffer.trim();
      buffer = '';

      console.log("Sentence:", sentence);
      // 🔊 Call Azure TTS

      console.log("Calling getAzureTTS.................");
      const audioBuffer = await getAzureTTS(sentence); // Return raw MP3 buffer

      // Convert buffer to base64
      const audioBase64 = Buffer.from(audioBuffer).toString('base64');

      // 🔁 Send to frontend
      console.log("Sending audio to frontend....................");
      res.write(`data: ${JSON.stringify({ text: sentence, audio: audioBase64 })}\n\n`);
    }
  }

  res.write(`event: done\ndata: {}\n\n`);
  res.end();

};


