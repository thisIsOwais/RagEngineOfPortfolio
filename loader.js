//document loader.js:
import fs from "fs/promises";
import path from "path";
import { Document } from "langchain/document";

const folderPath = path.join(process.cwd(), "data");

export async function contentLoader() {
  const files = await fs.readdir(folderPath);
  const documents = [];

  for (const file of files) {
    const content = await fs.readFile(path.join(folderPath, file), "utf-8");
    documents.push(new Document({
      pageContent: content,
      metadata: { source: file }
    }));
  }

  return documents; 
}
