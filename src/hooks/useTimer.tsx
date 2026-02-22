import { useState, useEffect, useRef, useCallback } from 'react'

interface UseTimerOptions {
    seconds: number
    onExpire: () => void
    autoStart?: boolean
}

interface UseTimerReturn {
    timeLeft: number
    isRunning: boolean
    progress: number   // 0~1 (남은 비율)
    start: () => void
    stop: () => void
    reset: () => void
}

export function useTimer({ seconds, onExpire, autoStart = false }: UseTimerOptions): UseTimerReturn {
    const [timeLeft, setTimeLeft] = useState(seconds)
    const [isRunning, setIsRunning] = useState(autoStart)
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const onExpireRef = useRef(onExpire)

    // onExpire가 바뀌어도 stale closure 방지
    useEffect(() => {
        onExpireRef.current = onExpire
    }, [onExpire])

    const clearTimer = useCallback(() => {
        if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
        }
    }, [])

    const start = useCallback(() => {
        clearTimer()
        setTimeLeft(seconds)
        setIsRunning(true)
    }, [seconds, clearTimer])

    const stop = useCallback(() => {
        clearTimer()
        setIsRunning(false)
    }, [clearTimer])

    const reset = useCallback(() => {
        clearTimer()
        setTimeLeft(seconds)
        setIsRunning(false)
    }, [seconds, clearTimer])

    useEffect(() => {
        if (!isRunning) return

        intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
            if (prev <= 1) {
            clearTimer()
            setIsRunning(false)
            onExpireRef.current()
            return 0
            }
            return prev - 1
        })
        }, 1000)

        return clearTimer
    }, [isRunning, clearTimer])

    // 자동 시작
    useEffect(() => {
        if (autoStart) start()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
        timeLeft,
        isRunning,
        progress: timeLeft / seconds,
        start,
        stop,
        reset,
    }
}