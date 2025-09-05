import React from 'react'
import WifiIcon from '@mui/icons-material/Wifi'
import WifiOffIcon from '@mui/icons-material/WifiOff'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import TokenIcon from '@mui/icons-material/Token'
import { config } from '../config'
import TokenUsageModal, { type TokenUsage } from './TokenUsageModal'

interface HeaderProps {
  sessionId: string
  lastMessageTime?: Date
  isConnecting?: boolean
  tokenUsage?: TokenUsage | null
}

const Header: React.FC<HeaderProps> = ({ sessionId, lastMessageTime, isConnecting = false, tokenUsage }) => {
  const [progressPercentage, setProgressPercentage] = React.useState(100)
  const [isSessionStarted, setIsSessionStarted] = React.useState(false)
  const [isTokenModalOpen, setIsTokenModalOpen] = React.useState(false)
  
  // Démarrer la progression seulement quand on a un vrai sessionId (pas vide)
  React.useEffect(() => {
    if (sessionId && sessionId.trim() !== '') {
      setIsSessionStarted(true)
      const startTime = lastMessageTime ? lastMessageTime.getTime() : Date.now()
      const sessionDuration = config.SESSION_DURATION
      
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime
        const remaining = Math.max(0, sessionDuration - elapsed)
        const progress = (remaining / sessionDuration) * 100
        setProgressPercentage(progress)
        
        if (remaining <= 0) {
          clearInterval(interval)
          setProgressPercentage(0)
        }
      }, 100)
      
      return () => clearInterval(interval)
    } else {
      setIsSessionStarted(false)
      setProgressPercentage(100)
    }
  }, [sessionId, lastMessageTime])

  return (
    <header className="header">
      <div className="header-left">
        <div className="title-container">
          <AutoAwesomeIcon className="sparkles-icon" />
          <h1 className="title">AI Assistant</h1>
        </div>
      </div>
      
      <div className="header-center">
        {tokenUsage && (
          <button
            type="button"
            className="token-usage-button-header"
            onClick={() => setIsTokenModalOpen(true)}
            title="Token Usage Details"
          >
            <TokenIcon />
          </button>
        )}
      </div>
      
      <div className="header-right">
        <div className="status-indicators">
          <div className="status-item">
            {isConnecting ? (
              <WifiIcon className="wifi-icon connecting" />
            ) : isSessionStarted ? (
              <WifiIcon className="wifi-icon connected" />
            ) : (
              <WifiOffIcon className="wifi-icon disconnected" />
            )}
          </div>
          
          {isSessionStarted && (
            <div className={`session-info ${progressPercentage === 0 ? 'session-expired' : ''}`}>
              <div className={`session-id ${progressPercentage === 0 ? 'session-expired' : ''}`}>
                {sessionId}
              </div>
              <div className="progress-bar-container">
                <div 
                  className={`progress-bar ${progressPercentage >= 40 ? 'green' : progressPercentage >= 15 ? 'orange' : 'red'}`}
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          )}
          
        </div>
      </div>

      {tokenUsage && (
        <TokenUsageModal
          isOpen={isTokenModalOpen}
          onClose={() => setIsTokenModalOpen(false)}
          tokenUsage={tokenUsage}
        />
      )}
    </header>
  )
}

export default Header 