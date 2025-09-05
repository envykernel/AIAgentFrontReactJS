import React, { useState } from 'react'
import TokenIcon from '@mui/icons-material/Token'
import TokenUsageModal from './TokenUsageModal'
import { type TokenUsage } from './TokenUsageModal'

interface TokenUsageButtonProps {
  tokenUsage: TokenUsage
}

const TokenUsageButton: React.FC<TokenUsageButtonProps> = ({ tokenUsage }) => {
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false)

  return (
    <>
      <div className="token-button-container">
        <button 
          className="token-usage-button-standalone"
          onClick={() => setIsTokenModalOpen(true)}
          title="Token Usage Details"
        >
          <TokenIcon />
        </button>
      </div>
      
      <TokenUsageModal
        isOpen={isTokenModalOpen}
        onClose={() => setIsTokenModalOpen(false)}
        tokenUsage={tokenUsage}
      />
    </>
  )
}

export default TokenUsageButton
