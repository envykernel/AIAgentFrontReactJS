import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import ChatWindow from './components/ChatWindow'
import MessageInput from './components/MessageInput'

interface Message {
  id: number
  type: 'assistant' | 'user'
  text: string
  timestamp: Date
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'assistant',
      text: 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?',
      timestamp: new Date()
    }
  ])

  const [sessionTime] = useState('0:46')
  const [sessionId] = useState('2b8b8d69-42f6-446c-a225-fd0871ef42dc')

  const handleSendMessage = (message: string) => {
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        type: 'user',
        text: message,
        timestamp: new Date()
      }
      setMessages([...messages, newMessage])
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: messages.length + 2,
          type: 'assistant',
          text: 'Je comprends votre message. Laissez-moi vous aider avec cela.',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiResponse])
      }, 1000)
    }
  }

  const handleReset = () => {
    setMessages([
      {
        id: 1,
        type: 'assistant',
        text: 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?',
        timestamp: new Date()
      }
    ])
  }

  return (
    <div className="app">
      <Header 
        sessionTime={sessionTime}
        sessionId={sessionId}
        isConnected={true}
      />
      <ChatWindow messages={messages} isStreaming={false} />
      <MessageInput 
        onSendMessage={handleSendMessage}
        onReset={handleReset}
      />
    </div>
  )
}

export default App
