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
          
          <div className="session-id">
            {sessionId}
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