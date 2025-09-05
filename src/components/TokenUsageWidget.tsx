import React from 'react'
import TokenIcon from '@mui/icons-material/Token'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'

export interface TokenUsage {
  maxTokens: number
  totalTokenCount: number
  remainingTokens: number
  tokenUsagePercentage: number
}

interface TokenUsageWidgetProps {
  tokenUsage: TokenUsage | null
}

const TokenUsageWidget: React.FC<TokenUsageWidgetProps> = ({ tokenUsage }) => {
  if (!tokenUsage) return null

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return '#ef4444' // Red
    if (percentage >= 75) return '#f59e0b' // Orange
    if (percentage >= 50) return '#3b82f6' // Blue
    return '#10b981' // Green
  }

  const usageColor = getUsageColor(tokenUsage.tokenUsagePercentage)

  return (
    <div className="token-usage-inline">
      <div className="inline-header">
        <TokenIcon className="inline-icon" />
        <span className="inline-title">Token Usage</span>
        <span className="inline-percentage" style={{ color: usageColor }}>
          {tokenUsage.tokenUsagePercentage.toFixed(1)}%
        </span>
      </div>
      
      <div className="inline-progress-container">
        <div className="inline-progress-bar">
          <div 
            className="inline-progress-fill"
            style={{ 
              width: `${tokenUsage.tokenUsagePercentage}%`,
              backgroundColor: usageColor
            }}
          ></div>
        </div>
      </div>
      
      <div className="inline-stats">
        <div className="inline-stat">
          <TrendingUpIcon className="stat-icon" />
          <span className="stat-value">{tokenUsage.totalTokenCount.toLocaleString()}</span>
          <span className="stat-label">Used</span>
        </div>
        <div className="inline-divider">•</div>
        <div className="inline-stat">
          <span className="stat-value">{tokenUsage.remainingTokens.toLocaleString()}</span>
          <span className="stat-label">Remaining</span>
        </div>
        <div className="inline-divider">•</div>
        <div className="inline-stat">
          <span className="stat-value">{tokenUsage.maxTokens.toLocaleString()}</span>
          <span className="stat-label">Total</span>
        </div>
      </div>
    </div>
  )
}

export default TokenUsageWidget
