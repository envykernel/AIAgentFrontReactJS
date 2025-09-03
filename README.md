# AI Agent Frontend ReactJS

This is a React frontend application that integrates with the MultiAgentsBeta API backend for AI chat functionality.

## Features

- **Real-time Chat**: Send messages to AI agents and receive responses
- **Session Management**: Automatic session creation and management
- **Token Management**: Real-time token usage tracking and statistics
- **Error Handling**: Comprehensive error handling and user feedback
- **Loading States**: Visual feedback during API calls
- **Responsive Design**: Modern, responsive UI design

## API Integration

The application integrates with the MultiAgentsBeta API using the following endpoints:

### Main Chat Endpoint
- **URL**: `POST /api/agent/chat`
- **Purpose**: Send chat messages and receive AI responses
- **Features**:
  - Automatic session creation for first message
  - Session continuation for follow-up messages
  - Token usage tracking
  - Conversation summarization when token limits are approached

### Testing Endpoints
- **Health Check**: `GET /api/test/health`
- **CORS Test**: `GET /api/test/cors`

## How It Works

### Initial Message Flow
1. User sends first message
2. App calls `/api/agent/chat` with empty `sessionId`
3. Backend creates new session and returns `sessionId`
4. App stores `sessionId` for future messages
5. AI response is displayed to user

### Follow-up Message Flow
1. User sends additional message
2. App calls `/api/agent/chat` with existing `sessionId`
3. Backend continues conversation in same session
4. AI response is displayed to user

### Session Management
- Sessions are automatically created on first message
- Session ID is stored and reused for conversation continuity
- Sessions can be reset by clicking the reset button
- New conversations start fresh sessions

## Development

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### API Configuration
The API base URL is configured in `src/services/api.ts`:
```typescript
const API_BASE_URL = 'http://localhost:5107'; // Development server
```

## File Structure

```
src/
├── components/
│   ├── ChatWindow.tsx      # Main chat interface
│   ├── Header.tsx         # Header with session info
│   ├── LoadingIndicator.tsx # Loading state component
│   ├── Message.tsx        # Individual message component
│   ├── MessageBlock.tsx   # Message block component
│   └── MessageInput.tsx   # Message input component
├── services/
│   └── api.ts            # API service layer
├── utils/
│   └── apiTest.ts        # API testing utilities
├── App.tsx               # Main application component
└── main.tsx              # Application entry point
```

## API Response Format

The chat API returns responses in the following format:

```typescript
interface ChatResponse {
  sessionId: string;           // Unique session identifier
  message: string;             // AI response text
  role: 'assistant';          // Message role (always 'assistant')
  timestamp: string;          // Response timestamp
  tokenCount: number;         // Tokens in current response
  isNewSession: boolean;      // Whether this is a new session
  totalMessageCount: number;  // Total messages in session
  totalTokenCount: number;    // Total tokens used
  maxTokens: number;         // Maximum allowed tokens
  remainingTokens: number;   // Remaining tokens
  tokenUsagePercentage: number; // Usage percentage
}
```

## Error Handling

The application handles various error scenarios:

- **Network Errors**: Displayed to user with retry options
- **API Errors**: Error messages from backend are shown
- **Session Errors**: Automatic session reset on invalid sessions
- **Loading States**: Visual feedback during API calls

## Testing

To test the API integration, you can use the browser console:

```javascript
// Import and run the test function
import { testApiConnection } from './utils/apiTest';
testApiConnection();
```

Or run it directly in the browser console if the function is available globally.

## Environment Configuration

The application is configured for development by default. For production, update the API base URL in `src/services/api.ts`.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
