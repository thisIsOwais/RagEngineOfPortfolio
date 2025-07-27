import fs from "fs";
import path from "path";

const debugLogPath = path.join(process.cwd(), "rag_audio_debug.log");

export function logToFile(type, data) {
  let entry = '';
  
  switch (type) {
    case 'debug':
      entry = `==== DEBUG ENTRY ====\n${new Date().toISOString()}\nMessage: ${data}\n\n`;
      break;
      
    case 'onboarding':
      entry = `==== ONBOARDING ENTRY ====\n${new Date().toISOString()}\nUser Details: ${JSON.stringify(data)}\n\n`;
      break;
      
    case 'query':
      const { name, email, query } = data;
      entry = `==== QUERY ENTRY ====\n${new Date().toISOString()}\n👤 Name: ${name}\n📧 Email: ${email}\n💬 Query: "${query}"\n\n`;
      break;
      
    case 'answer':
      entry = `==== SENTENCE ENTRY ====\n${new Date().toISOString()}\nSentence: ${data}\n\n`;
      break;
      
    default:
      entry = `==== UNKNOWN ENTRY ====\n${new Date().toISOString()}\nData: ${JSON.stringify(data)}\n\n`;
  }

  fs.appendFile(debugLogPath, entry, (err) => {
    if (err) {
      console.error(`❌ Error writing ${type} entry to debug log:`, err);
    }
  });
}
