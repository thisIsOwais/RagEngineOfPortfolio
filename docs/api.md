# API Documentation

## Base URL

The API is accessible at: `http://localhost:5000`

## Endpoints

### Health Check

```http
GET /
```

Returns a simple message indicating the API is running.

**Response**
```text
🧠 GhostMe RAG API is running
```

### Ask Question

```http
POST /api/ask
```

Endpoint for submitting questions to the RAG system.

**Request Body**

```json
{
  "query": "string"
}
```

**Parameters**

| Parameter | Type   | Required | Description           |
|-----------|--------|----------|-----------------------|
| query     | string | Yes      | The question to ask   |

**Response**

The endpoint uses Server-Sent Events (SSE) to stream the response.

- Content-Type: `text/event-stream`
- Response Format: JSON events

**Success Response Example**
```json
{
  "data": "Based on your portfolio, I can see you have experience with React and Node.js..."
}
```

**Error Response Example**
```json
{
  "error": "Query is required"
}
```

## CORS Configuration

The API is configured to accept requests from `http://localhost:3000` by default.

## Error Handling

- 400 Bad Request: Returned when the query parameter is missing
- 500 Internal Server Error: Returned when there's an error processing the request

## Rate Limiting

Currently, there is no rate limiting implemented. However, be mindful of the number of requests to ensure optimal performance.