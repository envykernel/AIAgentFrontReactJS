# Assistant IA - Chatbot Interface

A modern, responsive chatbot interface built with React, TypeScript, and Vite. The application features a clean design with a green and white theme, perfect for AI assistant interactions.

## Features

- **Modern UI Design**: Clean, responsive interface with green (#157347) and white color scheme
- **Real-time Chat**: Interactive chat window with AI assistant and user messages
- **Status Indicators**: Connection status, session ID, and timer display
- **Action Buttons**: Quick access buttons for common actions
- **Responsive Layout**: Works seamlessly on desktop and mobile devices
- **TypeScript**: Full type safety and modern development experience

## Layout Components

### Header Section

- **Title**: "Assistant IA" in green text
- **Connection Status**: Shows connection endpoint (http://localhost:5121)
- **Status Panel**: WiFi icon, session ID, and session timer

### Chat Window

- **Message Display**: Chat bubbles with AI robot icons and user messages
- **Action Buttons**: "hello" button and user profile button
- **Message History**: Scrollable conversation history

### Message Input

- **Text Input**: Multi-line textarea with placeholder text
- **Send Button**: Paper plane icon for sending messages
- **Reset Button**: Blue outlined button to reset conversation
- **Helper Text**: Instructions for keyboard shortcuts
- **Profile Button**: Bottom-left circular button with "N"

## Keyboard Shortcuts

- **Enter**: Send message
- **Shift + Enter**: New line in message

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Create a production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Header with title and status indicators
│   ├── ChatWindow.tsx      # Main chat interface
│   └── MessageInput.tsx    # Message input and controls
├── App.tsx                 # Main application component
├── App.css                 # Application styles
├── main.tsx               # Application entry point
└── index.css              # Global styles
```

## Technologies Used

- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and dev server
- **CSS3**: Modern styling with flexbox and CSS Grid
- **ESLint**: Code quality and consistency

## Customization

The application can be easily customized by modifying:

- Color scheme in `src/App.css`
- Component behavior in individual component files
- Message handling logic in `src/App.tsx`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.
