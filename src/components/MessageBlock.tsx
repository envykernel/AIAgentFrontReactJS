import React from 'react'

interface MessageBlockProps {
  type: 'text' | 'action' | 'user' | 'agent'
  content: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  uniformStyle?: boolean
  isTyping?: boolean
}

const MessageBlock: React.FC<MessageBlockProps> = ({ 
  type, 
  content, 
  onClick, 
  variant = 'primary',
  uniformStyle = false,
  isTyping = false
}) => {
  // When uniformStyle is true, always render as text block regardless of type
  if (uniformStyle) {
    return (
      <div 
        className="message-text-block"
        onClick={onClick}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
      >
        {content}
      </div>
    )
  }

  // For user and agent messages, render with enhanced styling
  if (type === 'user' || type === 'agent') {
    return (
      <div className={`message-text-block message-${type} ${isTyping ? 'typing' : ''}`}>
        {content}
        {isTyping && (
          <div className="typing-indicator">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        )}
      </div>
    )
  }

  // Normal behavior when uniformStyle is false
  if (type === 'action') {
    return (
      <button 
        className={`message-action-button ${variant}`}
        onClick={onClick}
      >
        {content}
      </button>
    )
  }

  // Text type
  return (
    <div className="message-text-block">
      {content}
    </div>
  )
}

export default MessageBlock 