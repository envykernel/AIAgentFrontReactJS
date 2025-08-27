import React from 'react'
import BotIcon from '@mui/icons-material/SmartToy'
import PersonIcon from '@mui/icons-material/Person'
import PauseIcon from '@mui/icons-material/Pause'
import MessageBlock from './MessageBlock'

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
  const handleHelloClick = () => {
    console.log('Hello button clicked!')
    // You can add any logic here for when hello is clicked
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="action-buttons">
          <MessageBlock 
            type="action"
            content="Hello"
            onClick={handleHelloClick}
            variant="primary"
          />
          <button className="user-profile-button">
            <PersonIcon />
          </button>
          {isStreaming && (
            <div className="streaming-indicator">
              <PauseIcon className="pause-icon" />
              <span>En cours...</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="messages-container">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`message ${message.type === 'assistant' ? 'assistant' : 'user'}`}
          >
            {message.type === 'assistant' && (
              <div className="message-avatar">
                <BotIcon className="ai-robot-icon" />
              </div>
            )}
            
            <div className="message-content">
              <div className="message-bubble">
                <MessageBlock 
                  type="text"
                  content={message.text}
                />
              </div>
              <div className="message-timestamp">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatWindow 