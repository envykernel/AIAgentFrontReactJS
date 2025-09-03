import React, { useEffect, useRef } from 'react'
import PauseIcon from '@mui/icons-material/Pause'
import Message from './Message'
import LoadingIndicator from './LoadingIndicator'

interface Message {
  id: number
  type: 'assistant' | 'user'
  text: string
  timestamp: Date
  isThinking?: boolean
}

interface ChatWindowProps {
  messages: Message[]
  isStreaming?: boolean
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isStreaming = false }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      })
    }
  }

  // Scroll automatique quand de nouveaux messages arrivent
  useEffect(() => {
    scrollToBottom()
  }, [messages, isStreaming])

  // Scroll automatique quand le composant se monte
  useEffect(() => {
    scrollToBottom()
  }, [])

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="action-buttons">
          {/* Indicateur de streaming supprimé - maintenant dans le Header */}
        </div>
      </div>
      
      <div className="messages-container" ref={messagesContainerRef}>
        {/* Show actual messages */}
        {messages.map((message, index) => (
          <Message
            key={message.id}
            type={message.type}
            text={message.text}
            isThinking={message.isThinking}
          />
        ))}
        
        {/* Invisible div for scroll reference */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}

export default ChatWindow 