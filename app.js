// app.js
import express from 'express'
import cors from "cors";
import { initRag, getRagResponse } from "./ragEngine.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({origin: "http://localhost:3000"}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🧠 GhostMe RAG API is running");
});



// API endpoint for asking questions
app.post("/api/ask", async (req, res) => {
    const query = req.body.query;
    if (!query) return res.status(400).end("Query is required");
    
    console.log("Received query:", query);
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders(); // send headers immediately
  
    try {
        console.log("Calling getRagResponse..."); //
      await getRagResponse(query, res); // pass res into getRagResponse for streaming
    } catch (err) {
      console.error("❌ RAG error:", err.message);
      res.write(`event: error\ndata: ${JSON.stringify({ error: err.message })}\n\n`);
      res.end();
    }
  });
  
  

// Start server after RAG setup
initRag().then( () => {
    app.listen(port, () => {
        console.log(`🚀 Server running on http://localhost:5000}`);
    });
})

