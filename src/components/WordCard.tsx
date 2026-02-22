import React, { useState } from 'react'
import type { Cell } from '../types'

type CardState = 'idle' | 'correct' | 'wrong'

interface WordCardProps {
    cell: Cell
    fontSize: string   // Tailwind font-size
    disabled: boolean
    onClick: (cell: Cell) => void
} 

/**
 * WordCard - 각 단어 카드 셀
 * 클릭 시 정답/오답 애니메이션 처리
 */
const WordCard: React.FC<WordCardProps> = ({ cell, fontSize, disabled, onClick }) => {
    const [cardState, setCardState] = useState<CardState>('idle')

    const handleClick = () => {
        if (disabled || cardState !== 'idle') return

        const nextState: CardState = cell.isOdd ? 'correct' : 'wrong'
        setCardState(nextState)
        onClick(cell)
    }

    return (
        <button
        onClick={handleClick}
        disabled={disabled}
        className={`
            flex items-center justify-center
            w-full aspect-square rounded-xl border
            font-body font-medium select-none
            transition-all duration-150
            ${fontSize}
            ${
            cardState === 'idle'
                ? 'border-slate-200 bg-white text-slate-700 hover:border-blue-400 active:scale-95'
                : cardState === 'correct'
                ? 'border-emerald-400 bg-emerald-50 text-emerald-600 animate-pop'
                : 'border-red-300 bg-red-50 text-red-400 animate-shake'
            }
            ${disabled && cardState === 'idle' ? 'cursor-not-allowed' : 'cursor-pointer'}
        `}
        >
        {cell.word}
        </button>
    )
}

export default WordCard