/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react'

const QuestionsContext = createContext()

export function QuestionsProvider({ children }) {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fetches directly from the public/QuestionBank folder
    fetch('/QuestionBank/questions.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch questions')
        return res.json()
      })
      .then(data => {
        setQuestions(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const getByLevel = (level) => questions.filter(q => q.level === level)

  return (
    <QuestionsContext.Provider value={{ questions, loading, error, getByLevel }}>
      {children}
    </QuestionsContext.Provider>
  )
}

export const useQuestions = () => useContext(QuestionsContext)