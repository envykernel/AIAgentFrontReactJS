import React, { useEffect, useRef } from 'react'
import PauseIcon from '@mui/icons-material/Pause'
import Message from './Message'

interface Message {
  id: number
  type: 'assistant' | 'user'
  text: string
  timestamp: Date
}

interface ChatWindowProps {
  messages: Message[]
  isStreaming?: boolean
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isStreaming = false }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isStreaming])

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="action-buttons">
          {isStreaming && (
            <div className="streaming-indicator">
              <PauseIcon className="pause-icon" />
              <span>En cours...</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="messages-container">
        {/* Hello message */}
        <Message
          type="assistant"
          text="Hello! How can I help you today?"
        />
        
        {/* Sample user message */}
        <Message
          type="user"
          text="Hi! I need help with my React project. Can you assist me?"
        />
        
        {/* Sample assistant response */}
        <Message
          type="assistant"
          text="Of course! I'd be happy to help you with your React project. What specific issue are you facing?"
        />
        
        {/* Sample user follow-up */}
        <Message
          type="user"
          text="I'm having trouble with state management and component communication. The data isn't flowing properly between components."
        />
        
        {/* Sample assistant detailed response */}
        <Message
          type="assistant"
          text="That's a common challenge in React! There are several approaches we can use: props for parent-child communication, Context API for deeper component trees, or state management libraries like Redux. Which approach would you prefer to explore first?"
        />
        
        {/* User messages from props */}
        {messages.map((message, index) => (
          <Message
            key={message.id}
            type={message.type}
            text={message.text}
            isTyping={isStreaming && index === messages.length - 1}
          />
        ))}
        
        {/* Invisible div for scroll reference */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}

export default ChatWindow 