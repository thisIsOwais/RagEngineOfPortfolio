# Data Management Documentation

## Data Structure

### Directory Structure

```
data/
├── about.txt      # Personal information and background
├── projects.txt   # Project descriptions and achievements
├── resume.txt     # Professional experience and skills
└── skills.txt     # Technical and soft skills details
```

## Document Processing

### Content Loading

The system uses `loader.js` to process text files:

```javascript
const folderPath = path.join(process.cwd(), "data");
```

- Automatically reads all `.txt` files in the data directory
- Creates Langchain `Document` objects for each file
- Preserves file source in metadata

### Text Splitting

Documents are processed using `RecursiveCharacterTextSplitter`:

- Chunk size: 1000 characters
- Overlap: 200 characters
- Maintains context between chunks

## Vector Storage

### Pinecone Integration

- Index name: "ghostme-index"
- Concurrent operations: Maximum 5
- Retrieval count: 3 documents per query

### Document Embedding

- Provider: Azure OpenAI
- Embedding model: Configured via environment variables
- Batch processing for efficiency

## Content Management

### Adding New Content

1. Create new `.txt` file in `data` directory
2. Follow existing file format conventions
3. Restart server to reindex content

### Updating Content

1. Modify existing `.txt` files
2. Save changes
3. Restart server to update embeddings

### Content Guidelines

1. **File Format**
   - Plain text (.txt) files
   - UTF-8 encoding
   - Line breaks for readability

2. **Content Structure**
   - Clear sections
   - Consistent formatting
   - Relevant information only

3. **Best Practices**
   - Keep content focused and relevant
   - Update regularly
   - Maintain professional tone

## Performance Optimization

### Vector Store

1. **Index Management**
   - Regular maintenance
   - Optimization checks
   - Performance monitoring

2. **Query Optimization**
   - Efficient retrieval
   - Relevance tuning
   - Response time monitoring

### Content Processing

1. **Chunk Optimization**
   - Balance size vs. context
   - Adjust overlap as needed
   - Monitor retrieval quality

2. **Embedding Efficiency**
   - Batch processing
   - Caching strategies
   - Resource management

## Backup and Recovery

### Data Backup

1. **Source Files**
   - Regular backups of text files
   - Version control integration
   - Backup verification

2. **Vector Store**
   - Index backups
   - Recovery procedures
   - Consistency checks

## Monitoring and Maintenance

### System Health

1. **Performance Metrics**
   - Response times
   - Retrieval accuracy
   - System resource usage

2. **Content Quality**
   - Regular content reviews
   - Update frequency
   - Relevance checks

### Troubleshooting

1. **Common Issues**
   - Embedding failures
   - Retrieval errors
   - Content processing issues

2. **Resolution Steps**
   - Error identification
   - Recovery procedures
   - Prevention measures