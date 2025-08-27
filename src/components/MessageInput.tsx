import React, { useState } from 'react'
import SendIcon from '@mui/icons-material/Send'
import RefreshIcon from '@mui/icons-material/Refresh'

interface MessageInputProps {
  onSendMessage: (message: string) => void
  onReset: () => void
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, onReset }) => {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as React.FormEvent)
    }
  }

  return (
    <div className="message-input-container">
      <form onSubmit={handleSubmit} className="message-form">
        <div className="input-wrapper">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tapez votre message ici…"
            className="message-input"
            rows={1}
          />
          
          <div className="input-actions">
            <button type="submit" className="send-button">
              <SendIcon />
            </button>
            <button type="button" onClick={onReset} className="reset-button">
              <RefreshIcon />
            </button>
          </div>
        </div>
        
        <div className="helper-text">
          Appuyez sur Entrée pour envoyer, Maj+Entrée pour une nouvelle ligne
        </div>
      </form>
      
      <div className="bottom-left-button">
        <button className="profile-button">N</button>
      </div>
    </div>
  )
}

export default MessageInput 