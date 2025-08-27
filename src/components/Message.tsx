import React from 'react'
import BotIcon from '@mui/icons-material/SmartToy'
import PersonIcon from '@mui/icons-material/Person'

interface MessageProps {
  type: 'assistant' | 'user'
  text: string
  isTyping?: boolean
}

const Message: React.FC<MessageProps> = ({ 
  type, 
  text, 
  isTyping = false 
}) => {
  const isUser = type === 'user'
  
  return (
    <div className={`message ${type}`}>
      <div className="message-avatar">
        <div className="avatar-container">
          {isUser ? (
            <PersonIcon className="user-icon" />
          ) : (
            <BotIcon className="ai-robot-icon" />
          )}
        </div>
      </div>
      
      <div className="message-content">
        <div className="message-bubble">
          <div className="message-text">
            {text}
            {isTyping && (
              <div className="typing-indicator">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Message 