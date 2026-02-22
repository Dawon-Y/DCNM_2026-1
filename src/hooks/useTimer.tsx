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
    const [remainingMs, setRemainingMs] = useState(seconds * 1000)
    const [isRunning, setIsRunning] = useState(autoStart)
    const rafRef = useRef<number | null>(null)
    const onExpireRef = useRef(onExpire)
    const endTimeRef = useRef<number | null>(null)
    const durationRef = useRef(seconds * 1000)

    // onExpire가 바뀌어도 stale closure 방지
    useEffect(() => {
        onExpireRef.current = onExpire
    }, [onExpire])

    const clearTimer = useCallback(() => {
        if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current)
            rafRef.current = null
        }
    }, [])

    const start = useCallback(() => {
        clearTimer()
        durationRef.current = seconds * 1000
        endTimeRef.current = performance.now() + durationRef.current
        setRemainingMs(durationRef.current)
        setIsRunning(true)
    }, [seconds, clearTimer])

    const stop = useCallback(() => {
        clearTimer()
        setIsRunning(false)
    }, [clearTimer])

    const reset = useCallback(() => {
        clearTimer()
        durationRef.current = seconds * 1000
        endTimeRef.current = null
        setRemainingMs(durationRef.current)
        setIsRunning(false)
    }, [seconds, clearTimer])

    useEffect(() => {
        if (!isRunning) return

        if (!endTimeRef.current) {
            durationRef.current = seconds * 1000
            endTimeRef.current = performance.now() + durationRef.current
        }

        const tick = () => {
            const remaining = Math.max(0, (endTimeRef.current ?? performance.now()) - performance.now())
            setRemainingMs(remaining)
            if (remaining <= 0) {
                clearTimer()
                setIsRunning(false)
                onExpireRef.current()
                return
            }
            rafRef.current = requestAnimationFrame(tick)
        }

        rafRef.current = requestAnimationFrame(tick)

        return clearTimer
    }, [isRunning, clearTimer, seconds])

    // 자동 시작
    useEffect(() => {
        if (autoStart) start()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
        timeLeft: Math.ceil(remainingMs / 1000),
        isRunning,
        progress: durationRef.current > 0 ? remainingMs / durationRef.current : 0,
        start,
        stop,
        reset,
    }
}