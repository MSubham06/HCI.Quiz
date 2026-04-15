import { useState, useEffect, useRef, useCallback } from 'react'

export function useTimer(duration = 30, onExpire) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)
  const startTimeRef = useRef(null)
  const onExpireRef = useRef(onExpire)

  // Keep onExpire ref current without re-triggering effects
  useEffect(() => { onExpireRef.current = onExpire }, [onExpire])

  const start = useCallback(() => {
    setTimeLeft(duration)
    setRunning(true)
    startTimeRef.current = Date.now()
  }, [duration])

  const stop = useCallback(() => {
    setRunning(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }, [])

  const reset = useCallback(() => {
    stop()
    setTimeLeft(duration)
  }, [stop, duration])

  useEffect(() => {
    if (!running) return
    intervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000)
      const remaining = Math.max(0, duration - elapsed)
      setTimeLeft(remaining)
      if (remaining === 0) {
        clearInterval(intervalRef.current)
        setRunning(false)
        onExpireRef.current?.()
      }
    }, 250) // Poll at 250ms for accuracy

    return () => clearInterval(intervalRef.current)
  }, [running, duration])

  const percentLeft = (timeLeft / duration) * 100
  const isUrgent = timeLeft <= 10

  return { timeLeft, percentLeft, isUrgent, start, stop, reset, running }
}