import React from 'react'
import WifiIcon from '@mui/icons-material/Wifi'
import WifiOffIcon from '@mui/icons-material/WifiOff'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'

interface HeaderProps {
  sessionId: string
  lastMessageTime?: Date
}

const Header: React.FC<HeaderProps> = ({ sessionId, lastMessageTime }) => {
  const [progressPercentage, setProgressPercentage] = React.useState(100)
  const [isSessionStarted, setIsSessionStarted] = React.useState(false)
  
  // Démarrer la progression seulement quand on a un vrai sessionId (pas vide)
  React.useEffect(() => {
    if (sessionId && sessionId.trim() !== '') {
      setIsSessionStarted(true)
      const startTime = lastMessageTime ? lastMessageTime.getTime() : Date.now()
      const sessionDuration = 2 * 60 * 1000 // 2 minutes en millisecondes
      
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
      
      <div className="header-right">
        <div className="status-indicators">
          <div className="status-item">
            {isSessionStarted ? (
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
    </header>
  )
}

export default Header 