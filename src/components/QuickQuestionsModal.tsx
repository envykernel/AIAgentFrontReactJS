import React from 'react'
import FlightIcon from '@mui/icons-material/Flight'
import CloseIcon from '@mui/icons-material/Close'

interface QuickQuestionsModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectQuestion: (question: string) => void
}

const quickQuestions = [
  {
    category: "Passenger Rights",
    questions: [
      "What are my rights if my flight AF202 is cancelled?",
      "What compensation am I entitled to for a delayed flight?",
      "Can I get a refund if my flight is overbooked?",
      "What are my rights during a flight delay of more than 3 hours?"
    ]
  },
  {
    category: "Flight Status",
    questions: [
      "What's the status of flight AF101?",
      "Is flight AF205 on time?",
      "What's the departure time for flight AF150?",
      "Has flight AF300 landed?"
    ]
  },
  {
    category: "Airport Regulations",
    questions: [
      "What are the current security measures at the airport?",
      "What items are prohibited in carry-on luggage?",
      "What are the check-in requirements for international flights?",
      "What are the COVID-19 protocols at the airport?"
    ]
  },
  {
    category: "Practical Information",
    questions: [
      "Where can I find the lost and found office?",
      "What restaurants are available in the terminal?",
      "How do I get from terminal 1 to terminal 2?",
      "Where can I charge my phone at the airport?"
    ]
  }
]

const QuickQuestionsModal: React.FC<QuickQuestionsModalProps> = ({ 
  isOpen, 
  onClose, 
  onSelectQuestion 
}) => {
  if (!isOpen) return null

  const handleQuestionClick = (question: string) => {
    onSelectQuestion(question)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <FlightIcon className="modal-icon" />
            <h2>Quick Questions</h2>
          </div>
          <button className="modal-close-button" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        
        <div className="modal-body">
          <div className="categories-grid">
            {quickQuestions.map((category, categoryIndex) => (
              <div key={categoryIndex} className="category-box">
                <h3 className="category-title">{category.category}</h3>
                <div className="questions-list">
                  {category.questions.map((question, questionIndex) => (
                    <button
                      key={questionIndex}
                      className="question-button"
                      onClick={() => handleQuestionClick(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickQuestionsModal
