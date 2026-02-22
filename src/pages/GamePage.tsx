import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTimer } from '../hooks/useTimer'
import { STAGES, TOTAL_STAGES } from '../constants/Stages'
import WordGrid from '../components/WordGrid'
import type { Cell, StageConfig } from '../types'
import { generateGrid } from '../utils/generateGrid'

const GamePage: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { stageIndex = 0, score = 0 } = (location.state as { stageIndex: number; score: number }) ?? {}

    const currentStage = STAGES[stageIndex]
    if (!currentStage) {
        return null
    }

    return (
        <GameStage
            key={`stage-${stageIndex}`}
            stageIndex={stageIndex}
            score={score}
            stage={currentStage}
            navigate={navigate}
        />
    )
}

interface GameStageProps {
    stageIndex: number
    score: number
    stage: StageConfig
    navigate: ReturnType<typeof useNavigate>
}

const GameStage: React.FC<GameStageProps> = ({ stageIndex, score, stage, navigate }) => {
    const [phase, setPhase] = useState<'playing' | 'done'>('playing')
    const navigatedRef = useRef(false)

    const cells = useMemo(() => generateGrid(stage), [stage])

    const handleTimeout = () => {
        if (phase !== 'playing' || navigatedRef.current) return
        navigatedRef.current = true
        navigate('/fail', { state: { stageIndex, score, reason: 'timeout' } })
    }

    const timerSeconds = stage.stage === 1 ? 5 : stage.stage === 2 ? 4 : 3

    const { timeLeft, start, stop } = useTimer({
        seconds: timerSeconds,
        onExpire: handleTimeout,
    })

    useEffect(() => {
        navigatedRef.current = false
        start()
        return () => stop()
    }, [start, stop])

    const handleCellClick = (cell: Cell) => {
        if (phase !== 'playing' || navigatedRef.current) return
        navigatedRef.current = true
        stop()
        setPhase('done')

        if (cell.isOdd) {
            const nextScore = score + 1
            if (stageIndex + 1 >= TOTAL_STAGES) {
                navigate('/final', { state: { score: nextScore } })
                return
            }
            navigate('/success', { state: { stageIndex, score: nextScore } })
        } else {
            navigate('/fail', { state: { stageIndex, score, reason: 'wrong' } })
        }
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-lg">
            {/* 타이머 바 */}
            <div className="w-full h-2 md:h-2.5 bg-slate-100 rounded-full overflow-hidden mb-8">
            <div
                className="h-full bg-blue-600 rounded-full transition-all duration-1000 linear"
                style={{ width: `${(timeLeft / timerSeconds) * 100}%`, transition: 'width 1s linear' }}
            />
            </div>

            {/* 단계 + 설명 */}
            <div className="text-center mb-8">
            <p className="text-base md:text-lg font-medium text-slate-700 font-body">{stage.stage}단계</p>
            <p className="text-sm md:text-base text-slate-400 font-body mt-1">다른 단어를 찾아보세요!</p>
            </div>

            {/* 그리드 */}
            <WordGrid
            cells={cells}
            stage={stage}
            disabled={phase !== 'playing'}
            onCellClick={handleCellClick}
            />
        </div>
        </div>
    )
}

export default GamePage