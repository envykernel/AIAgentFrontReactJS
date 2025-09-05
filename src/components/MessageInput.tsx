import React, { useState } from 'react'
import SendIcon from '@mui/icons-material/Send'
import DeleteIcon from '@mui/icons-material/Delete'
import HelpIcon from '@mui/icons-material/Help'
import TokenIcon from '@mui/icons-material/Token'
import QuickQuestionsModal from './QuickQuestionsModal'
import TokenUsageModal from './TokenUsageModal'
import { type TokenUsage } from './TokenUsageWidget'

interface MessageInputProps {
  onSendMessage: (message: string) => void
  onReset: () => void
  disabled?: boolean
  tokenUsage?: TokenUsage | null
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, onReset, disabled = false, tokenUsage }) => {
  const [message, setMessage] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSendMessage(message)
      setMessage('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !disabled) {
      e.preventDefault()
      handleSubmit(e as React.FormEvent)
    }
  }

  const handleQuestionSelect = (question: string) => {
    onSendMessage(question)
  }

  return (
    <div className="message-input-container">
      <form onSubmit={handleSubmit} className="message-form">
        <div className="input-wrapper">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            className="message-input"
            rows={1}
            disabled={disabled}
          />
          
          <div className="input-actions">
            <button 
              type="button" 
              className="quick-questions-button" 
              onClick={() => setIsModalOpen(true)}
              disabled={disabled}
              title="Quick Questions"
            >
              <HelpIcon />
            </button>
            {tokenUsage && (
              <button 
                type="button" 
                className="token-usage-button" 
                onClick={() => setIsTokenModalOpen(true)}
                disabled={disabled}
                title="Token Usage Details"
              >
                <TokenIcon />
              </button>
            )}
            <button type="submit" className="send-button" disabled={disabled}>
              <SendIcon />
            </button>
            <button type="button" onClick={onReset} className="reset-button" disabled={disabled}>
              <DeleteIcon />
            </button>
          </div>
        </div>
        
        <div className="helper-text">
          Press Enter to send, Shift+Enter for a new line
        </div>
      </form>
      
      <QuickQuestionsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectQuestion={handleQuestionSelect}
      />
      
      <TokenUsageModal
        isOpen={isTokenModalOpen}
        onClose={() => setIsTokenModalOpen(false)}
        tokenUsage={tokenUsage}
      />
    </div>
  )
}

export default MessageInput 