import React from 'react'

interface MessageBlockProps {
  type: 'text' | 'action'
  content: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
}

const MessageBlock: React.FC<MessageBlockProps> = ({ 
  type, 
  content, 
  onClick, 
  variant = 'primary' 
}) => {
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

  return (
    <div className="message-text-block">
      {content}
    </div>
  )
}

export default MessageBlock 