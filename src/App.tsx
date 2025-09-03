import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import ChatWindow from './components/ChatWindow'
import MessageInput from './components/MessageInput'
import WifiOffIcon from '@mui/icons-material/WifiOff'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { apiService, type ChatResponse } from './services/api'

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
      
      // Mettre à jour le timestamp du dernier message
      setLastMessageTime(new Date())
      
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

      try {
        // Call the API with the current session ID (or empty for new session)
        const response: ChatResponse = await apiService.sendChatMessage({
          message: message,
          sessionId: currentSessionId || undefined
        })

        // Update session ID if this is a new session
        if (response.isNewSession) {
          setCurrentSessionId(response.sessionId)
        }

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
      }
    }
  }

  const handleReset = () => {
    setMessages([])
    setCurrentSessionId(null)
    setError(null)
    setIsSessionActive(true)
  }

  const handleNewConversation = () => {
    setMessages([])
    setCurrentSessionId(null)
    setError(null)
    setIsSessionActive(true)
  }

  return (
    <div className="app">
      <Header 
        sessionId={currentSessionId || ''}
        lastMessageTime={lastMessageTime}
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
        />
      ) : (
        <div className="session-footer">
          <div className="session-closed-message">
            <div className="session-closed-icon">
              <WifiOffIcon />
            </div>
            <div className="session-closed-text">
              <h3>Session Closed</h3>
              <p>Your 2-minute session has expired. Let's start a new conversation!</p>
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
