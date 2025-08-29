import React from 'react'
import WifiIcon from '@mui/icons-material/Wifi'
import WifiOffIcon from '@mui/icons-material/WifiOff'
import TimerOffIcon from '@mui/icons-material/TimerOff'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'

interface HeaderProps {
  sessionTime: string
  sessionId: string
  isConnected?: boolean
}

const Header: React.FC<HeaderProps> = ({ sessionTime, sessionId, isConnected = true }) => {
  // Calculer le pourcentage de progression basé sur le temps restant
  const calculateProgress = () => {
    const [minutes, seconds] = sessionTime.split(':').map(Number)
    const totalSeconds = minutes * 60 + seconds
    const totalSessionSeconds = 2 * 60 // 2 minutes
    const progress = (totalSeconds / totalSessionSeconds) * 100
    return Math.max(0, Math.min(100, progress))
  }

  const progressPercentage = calculateProgress()

  return (
    <header className="header">
      <div className="header-left">
        <div className="title-container">
          <AutoAwesomeIcon className="sparkles-icon" />
          <h1 className="title">Assistant IA</h1>
        </div>
      </div>
      
      <div className="header-right">
        <div className="status-indicators">
          <div className="status-item">
            {isConnected ? (
              <WifiIcon className="wifi-icon connected" />
            ) : (
              <WifiOffIcon className="wifi-icon disconnected" />
            )}
          </div>
          
          <div className="session-info">
            <div className="session-id">
              {sessionId}
            </div>
            <div className="progress-bar-container">
              <div 
                className={`progress-bar ${progressPercentage >= 40 ? 'green' : progressPercentage >= 15 ? 'orange' : 'red'}`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
          
          <div className="timer">
            <TimerOffIcon className="clock-icon" />
            <span>{sessionTime}</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 