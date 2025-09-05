import React from 'react'
import CloseIcon from '@mui/icons-material/Close'
import TokenIcon from '@mui/icons-material/Token'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { config } from '../config'

export interface TokenUsage {
  maxTokens: number
  totalTokenCount: number
  remainingTokens: number
  tokenUsagePercentage: number
}

interface TokenUsageModalProps {
  isOpen: boolean
  onClose: () => void
  tokenUsage: TokenUsage | null
}

const TokenUsageModal: React.FC<TokenUsageModalProps> = ({ isOpen, onClose, tokenUsage }) => {
  if (!isOpen || !tokenUsage) return null

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return config.THEME_COLORS.error
    if (percentage >= 75) return config.THEME_COLORS.warning
    if (percentage >= 50) return config.THEME_COLORS.primary
    return config.THEME_COLORS.success
  }

  const usageColor = getUsageColor(tokenUsage.tokenUsagePercentage)

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content token-modal-mini" onClick={(e) => e.stopPropagation()}>
        {/* Compact Header */}
        <div className="mini-header">
          <div className="mini-title">
            <TokenIcon className="mini-icon" />
            <span>Token Usage</span>
          </div>
          <button className="mini-close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        
        {/* Main Content */}
        <div className="mini-content">
          {/* Compact Stats */}
          <div className="mini-stats">
            <div className="mini-stat">
              <TrendingUpIcon className="mini-stat-icon" />
              <span className="mini-stat-value">{tokenUsage.totalTokenCount.toLocaleString()}</span>
              <span className="mini-stat-label">Used</span>
            </div>
            <div className="mini-stat">
              <div className="mini-stat-dot"></div>
              <span className="mini-stat-value">{tokenUsage.remainingTokens.toLocaleString()}</span>
              <span className="mini-stat-label">Left</span>
            </div>
            <div className="mini-stat">
              <TokenIcon className="mini-stat-icon" />
              <span className="mini-stat-value">{tokenUsage.maxTokens.toLocaleString()}</span>
              <span className="mini-stat-label">Total</span>
            </div>
          </div>

          {/* Mini Chart */}
          <div className="mini-chart-container">
            <div className="mini-chart">
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle
                  cx="40"
                  cy="40"
                  r="30"
                  fill="none"
                  stroke={config.THEME_COLORS.border}
                  strokeWidth="6"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="30"
                  fill="none"
                  stroke={usageColor}
                  strokeWidth="6"
                  strokeDasharray={`${tokenUsage.tokenUsagePercentage * 1.88} 188`}
                  strokeDashoffset="47"
                  transform="rotate(-90 40 40)"
                  className="mini-chart-arc"
                />
                <text x="40" y="45" textAnchor="middle" className="mini-chart-text">
                  {tokenUsage.tokenUsagePercentage.toFixed(0)}%
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TokenUsageModal