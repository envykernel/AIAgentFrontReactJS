import React, { useState } from 'react'
import './App.css'
import Header from './components/Header'
import ChatWindow from './components/ChatWindow'
import MessageInput from './components/MessageInput'
import WifiOffIcon from '@mui/icons-material/WifiOff'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { apiService, type ChatResponse } from './services/api'
import { type TokenUsage } from './components/TokenUsageModal'
import { config } from './config'
import { applyThemeColors } from './utils/theme'

interface Message {
  id: number
  type: 'assistant' | 'user'
  text: string
  timestamp: Date
  isThinking?: boolean
}

function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSessionActive, setIsSessionActive] = useState(true) // Session active par défaut
  const [lastMessageTime, setLastMessageTime] = useState<Date | undefined>(undefined)
  const [tokenUsage, setTokenUsage] = useState<TokenUsage | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  // Apply theme colors on app startup
  React.useEffect(() => {
    applyThemeColors()
  }, [])

  // Session timeout effect - 2 minutes of inactivity
  React.useEffect(() => {
    if (!lastMessageTime || !isSessionActive) return

    const timeoutDuration = config.SESSION_DURATION
    const timeoutId = setTimeout(() => {
      setIsSessionActive(false)
    }, timeoutDuration)

    return () => clearTimeout(timeoutId)
  }, [lastMessageTime, isSessionActive])

  const handleSendMessage = async (message: string) => {
    if (message.trim() && !isLoading) {
      const userMessage: Message = {
        id: messages.length + 1,
        type: 'user',
        text: message,
        timestamp: new Date()
      }
      
      // Ajouter le message de l'utilisateur
      setMessages(prev => [...prev, userMessage])
      
      // Mettre à jour le timestamp du dernier message et réactiver la session
      setLastMessageTime(new Date())
      setIsSessionActive(true)
      
      // Ajouter un message temporaire de l'assistant
      const tempAssistantMessage: Message = {
        id: messages.length + 2,
        type: 'assistant',
        text: "The assistant is thinking",
        timestamp: new Date(),
        isThinking: true
      }
      
      setMessages(prev => [...prev, tempAssistantMessage])
      setIsLoading(true)
      setError(null)
      
      // Set connecting state if this is the first message (no session ID yet)
      if (!currentSessionId) {
        setIsConnecting(true)
      }

      try {
        // Call the API with the current session ID (or empty for new session)
        const response: ChatResponse = await apiService.sendChatMessage({
          message: message,
          sessionId: currentSessionId || undefined
        })

        // Update session ID if this is a new session
        if (response.isNewSession) {
          setCurrentSessionId(response.sessionId)
          setIsConnecting(false) // Clear connecting state when session is established
        }

        // Update token usage data
        setTokenUsage({
          maxTokens: response.maxTokens,
          totalTokenCount: response.totalTokenCount,
          remainingTokens: response.remainingTokens,
          tokenUsagePercentage: response.tokenUsagePercentage
        })

        const assistantMessage: Message = {
          id: messages.length + 3,
          type: 'assistant',
          text: response.message,
          timestamp: new Date(response.timestamp)
        }

        // Remplacer le message temporaire par la vraie réponse
        setMessages(prev => {
          const newMessages = prev.slice(0, -1) // Supprimer le message temporaire
          return [...newMessages, assistantMessage]
        })
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred while communicating with the assistant.'
        setError(errorMessage)
        setIsConnecting(false) // Clear connecting state on error
        
        // Remplacer le message temporaire par le message d'erreur
        const errorMsg: Message = {
          id: messages.length + 3,
          type: 'assistant',
          text: `Error: ${errorMessage}`,
          timestamp: new Date()
        }
        
        setMessages(prev => {
          const newMessages = prev.slice(0, -1) // Supprimer le message temporaire
          return [...newMessages, errorMsg]
        })
      } finally {
        setIsLoading(false)
        setIsConnecting(false) // Clear connecting state when request completes
      }
    }
  }

  const handleReset = () => {
    setMessages([])
    setCurrentSessionId(null)
    setError(null)
    setIsSessionActive(true)
    setTokenUsage(null)
    setIsConnecting(false)
  }

  const handleNewConversation = () => {
    setMessages([])
    setCurrentSessionId(null)
    setError(null)
    setIsSessionActive(true)
    setTokenUsage(null)
    setLastMessageTime(undefined)
    setIsConnecting(false)
  }

  return (
    <div className="app">
      <Header 
        sessionId={currentSessionId || ''}
        lastMessageTime={lastMessageTime}
        isConnecting={isConnecting}
        tokenUsage={tokenUsage}
      />
      <ChatWindow messages={messages} isStreaming={isLoading} />
      {error && (
        <div className="error-message">
          <div className="error-content">
            <span className="error-icon">⚠️</span>
            <span className="error-text">{error}</span>
          </div>
        </div>
      )}
      {isSessionActive ? (
        <MessageInput 
          onSendMessage={handleSendMessage}
          onReset={handleReset}
          disabled={isLoading}
          tokenUsage={tokenUsage}
        />
      ) : (
        <div className="session-timeout-footer">
          <div className="session-timeout-message">
            <div className="session-timeout-icon">
              <WifiOffIcon />
            </div>
            <div className="session-timeout-text">
              <h3>Session Timed Out</h3>
              <p>Your session has expired after {Math.round(config.SESSION_DURATION / 60000)} minutes of inactivity. Start a new conversation to continue.</p>
            </div>
            <button 
              className="new-conversation-button"
              onClick={handleNewConversation}
            >
              <AutoAwesomeIcon />
              New Conversation
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
