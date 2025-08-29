import { useState, useEffect, useRef } from 'react'
import './App.css'
import Header from './components/Header'
import ChatWindow from './components/ChatWindow'
import MessageInput from './components/MessageInput'
import WifiOffIcon from '@mui/icons-material/WifiOff'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'

interface Message {
  id: number
  type: 'assistant' | 'user'
  text: string
  timestamp: Date
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'assistant',
      text: 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?',
      timestamp: new Date()
    }
  ])

  const [sessionTime, setSessionTime] = useState('2:00')
  const [sessionId] = useState('2b8b8d69-42f6-446c-a225-fd0871ef42dc')
  const [isSessionActive, setIsSessionActive] = useState(true) // Session active par défaut
  
  const timerRef = useRef<number | null>(null)
  const sessionStartTimeRef = useRef<number | null>(null)
  const SESSION_DURATION = 2 * 60 * 1000 // 2 minutes en millisecondes

  // Démarrer la session au chargement de la page
  useEffect(() => {
    startSession()
  }, [])

  const startSession = () => {
    setIsSessionActive(true)
    sessionStartTimeRef.current = Date.now()
    startTimer()
  }

  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    timerRef.current = setInterval(() => {
      if (sessionStartTimeRef.current) {
        const elapsed = Date.now() - sessionStartTimeRef.current
        const remainingSeconds = Math.max(0, Math.floor((SESSION_DURATION - elapsed) / 1000))
        const minutes = Math.floor(remainingSeconds / 60)
        const seconds = remainingSeconds % 60
        setSessionTime(`${minutes}:${seconds.toString().padStart(2, '0')}`)

        if (elapsed >= SESSION_DURATION) {
          // Session expirée après exactement 2 minutes
          setIsSessionActive(false)
          // Continuer à afficher le temps écoulé après expiration
          const overtimeSeconds = Math.floor((elapsed - SESSION_DURATION) / 1000)
          const overtimeMinutes = Math.floor(overtimeSeconds / 60)
          const overtimeSecs = overtimeSeconds % 60
          setSessionTime(`-${overtimeMinutes}:${overtimeSecs.toString().padStart(2, '0')}`)
        }
      }
    }, 100)
  }

  const resetSession = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    setIsSessionActive(false)
    setSessionTime('2:00')
    sessionStartTimeRef.current = null
  }

  const handleSendMessage = (message: string) => {
    if (message.trim()) {
      // Reset le timer à chaque message si la session est active
      if (isSessionActive) {
        resetSession()
        startSession()
      }

      const newMessage: Message = {
        id: messages.length + 1,
        type: 'user',
        text: message,
        timestamp: new Date()
      }
      setMessages([...messages, newMessage])
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: messages.length + 2,
          type: 'assistant',
          text: 'Je comprends votre message. Laissez-moi vous aider avec cela.',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiResponse])
      }, 1000)
    }
  }

  const handleReset = () => {
    setMessages([
      {
        id: 1,
        type: 'assistant',
        text: 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?',
        timestamp: new Date()
      }
    ])
    resetSession()
  }

  const handleNewConversation = () => {
    setMessages([
      {
        id: 1,
        type: 'assistant',
        text: 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?',
        timestamp: new Date()
      }
    ])
    resetSession()
  }

  // Cleanup du timer quand le composant se démonte
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  return (
    <div className="app">
      <Header 
        sessionId={sessionId}
      />
      <ChatWindow messages={messages} isStreaming={false} />
      {isSessionActive ? (
        <MessageInput 
          onSendMessage={handleSendMessage}
          onReset={handleReset}
        />
      ) : (
        <div className="session-footer">
          <div className="session-closed-message">
            <div className="session-closed-icon">
              <WifiOffIcon />
            </div>
            <div className="session-closed-text">
              <h3>Session fermée</h3>
              <p>Votre session de 2 minutes a expiré. Démarrons une nouvelle conversation !</p>
            </div>
            <button 
              className="new-conversation-button"
              onClick={handleNewConversation}
            >
              <AutoAwesomeIcon />
              Nouvelle conversation
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
