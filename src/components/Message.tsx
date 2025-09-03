import React from 'react'
import BotIcon from '@mui/icons-material/SmartToy'
import PersonIcon from '@mui/icons-material/Person'

interface MessageProps {
  type: 'assistant' | 'user'
  text: string
  isThinking?: boolean
}

const Message: React.FC<MessageProps> = ({ 
  type, 
  text, 
  isThinking = false
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
        <div className={`message-bubble ${isThinking ? 'thinking' : ''}`}>
          <div className="message-text">
            {text}
            {isThinking && (
              <span className="thinking-dots">
                <span className="thinking-dot">.</span>
                <span className="thinking-dot">.</span>
                <span className="thinking-dot">.</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Message 