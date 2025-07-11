# RAG Engine Documentation

## Overview

The RAG (Retrieval-Augmented Generation) engine is the core component of the GhostMe AI Assistant. It combines document retrieval with language model generation to provide accurate, context-aware responses based on portfolio content.

## Components

### 1. Document Processing

- **Content Loading**: Uses `loader.js` to read text files from the `data` directory
- **Text Splitting**: Implements `RecursiveCharacterTextSplitter` with:
  - Chunk size: 1000 characters
  - Chunk overlap: 200 characters

### 2. Embeddings

- **Provider**: Azure OpenAI Embeddings
- **Configuration**:
  - API Version: Configured via environment variables
  - Deployment: Custom Azure deployment

### 3. Vector Storage

- **Platform**: Pinecone
- **Index**: "ghostme-index"
- **Features**:
  - Maximum concurrency: 5
  - Retrieval count (k): 3 documents per query

### 4. Language Model

- **Provider**: Azure ChatGPT
- **Configuration**:
  - Temperature: 0.3 (balanced between creativity and accuracy)
  - Custom deployment on Azure

### 5. Prompt Template

Custom template designed for portfolio-specific responses:
- Assumes Owais's identity
- Maintains professional communication style
- Handles unknown information gracefully

### 6. Text-to-Speech Integration

- **Provider**: Azure TTS
- **Features**:
  - HD voice model
  - SSML support for enhanced speech control
  - Error handling for failed conversions

## Initialization Process

1. Load content from data files
2. Split documents into manageable chunks
3. Generate and store embeddings in Pinecone
4. Initialize retriever with vector store
5. Set up language model with custom prompt

## Response Generation

1. Receive query from API endpoint
2. Retrieve relevant documents using vector similarity
3. Generate response using custom prompt and context
4. Stream response to client
5. Optional: Convert response to speech

## Error Handling

- Graceful handling of initialization failures
- Streaming error events to client
- TTS conversion error management

## Environment Variables

Required environment variables:
- `AZURE_OPENAI_EMBEDDIN_KEY`
- `AZURE_OPENAI_DEPLOYMENT`
- `AZURE_OPENAI_API_EMBEDDING_VERSION`
- `AZURE_OPENAI_ENDPOINT`
- `PINECONE_API_KEY`
- `AZURE_OPENAI_KEY`
- `AZURE_OPENAI_LLM_DEPLOYMENT`
- `AZURE_OPENAI_API_VERSION`
- `AZURE_TTS_KEY`
- `AZURE_TTS_ENDPOINT`

## Performance Considerations

- Chunk size and overlap affect retrieval quality
- Vector store concurrency limits
- Temperature setting impacts response creativity
- Streaming implementation for real-time responses