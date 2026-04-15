/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react'

const GameContext = createContext()

export function GameProvider({ children }) {
  const [totalXP, setTotalXP] = useState(() => Number(localStorage.getItem('hci_total_xp')) || 0)
  const [highestLevel, setHighestLevel] = useState(() => Number(localStorage.getItem('hci_highest_level')) || 1)

  useEffect(() => {
    localStorage.setItem('hci_total_xp', totalXP)
    localStorage.setItem('hci_highest_level', highestLevel)
  }, [totalXP, highestLevel])

  const addXP = (amount) => setTotalXP(prev => prev + amount)
  
  const unlockLevel = (level) => {
    setHighestLevel(prev => Math.max(prev, level))
  }

  const completeGame = () => {
    localStorage.setItem('hci_game_completed', 'true')
  }

  return (
    <GameContext.Provider value={{ totalXP, highestLevel, addXP, unlockLevel, completeGame }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => useContext(GameContext)