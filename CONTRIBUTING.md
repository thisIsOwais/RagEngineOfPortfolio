# Contributing to GhostMe AI Assistant

Thank you for your interest in contributing to GhostMe AI Assistant! This document provides guidelines and steps for contributing to the project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone. We expect all contributors to:

- Use welcoming and inclusive language
- Be respectful of different viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## How to Contribute

### 1. Setting Up Development Environment

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/ai-assistant.git
   cd ai-assistant
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Copy environment variables:
   ```bash
   cp .env.example .env
   ```
5. Configure your environment variables

### 2. Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes
3. Test your changes thoroughly
4. Commit your changes:
   ```bash
   git commit -m "feat: add your feature description"
   ```

### 3. Commit Message Guidelines

We follow conventional commits for clear communication:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc)
- `refactor:` - Code refactoring
- `test:` - Adding or modifying tests
- `chore:` - Maintenance tasks

### 4. Code Style Guidelines

#### JavaScript

- Use ES6+ features
- Follow airbnb-base style guide
- Use meaningful variable and function names
- Add JSDoc comments for functions
- Keep functions small and focused

#### Documentation

- Keep documentation up to date
- Use clear and concise language
- Include code examples where appropriate
- Update README.md if adding new features

### 5. Testing Guidelines

- Write tests for new features
- Ensure all tests pass before submitting PR
- Include both unit and integration tests
- Follow test naming conventions

### 6. Pull Request Process

1. Update documentation
2. Run tests locally
3. Push to your fork
4. Create a Pull Request with:
   - Clear title and description
   - Reference to related issues
   - Screenshots/GIFs for UI changes

### 7. Review Process

1. Maintainers will review your PR
2. Address any requested changes
3. Once approved, PR will be merged

## Project Structure

```
ai-assistant/
├── data/           # Training data files
├── docs/           # Documentation
├── app.js          # Main application file
├── loader.js       # Content loader
├── ragEngine.js    # RAG implementation
└── package.json    # Project dependencies
```

## Development Workflow

### 1. Adding New Features

1. Check existing issues/create new one
2. Discuss implementation approach
3. Implement feature
4. Add tests and documentation
5. Submit PR

### 2. Fixing Bugs

1. Create issue describing the bug
2. Add test case reproducing the bug
3. Fix the bug
4. Submit PR

### 3. Improving Documentation

1. Identify documentation gaps
2. Make improvements
3. Submit PR

## Getting Help

- Check existing documentation
- Search existing issues
- Create new issue for questions

## Recognition

All contributors will be recognized in:

1. GitHub contributors list
2. Release notes
3. Project documentation

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.