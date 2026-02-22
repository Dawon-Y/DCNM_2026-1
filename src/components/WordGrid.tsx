import React from 'react'
import type { Cell, StageConfig } from '../types'
import WordCard from './WordCard'

interface WordGridProps {
    cells: Cell[]
    stage: StageConfig
    disabled: boolean
    onCellClick: (cell: Cell) => void
}

/**
 * WordGrid - cols x rows 그리드 레이아웃으로 WordCard 렌더링
 * 단계가 올라갈수록 폰트가 작아짐
 */
const FONT_SIZE_MAP: Record<number, string> = {
  2: 'text-base',   // 2x2
  3: 'text-sm',     // 3x3
  4: 'text-xs',     // 4x4
  5: 'text-xs',     // 5x5
  6: 'text-[10px]', // 6x6
}

const WordGrid: React.FC<WordGridProps> = ({ cells, stage, disabled, onCellClick }) => {
    const fontSize = FONT_SIZE_MAP[stage.cols] ?? 'text-xs'

    return (
        <div
        className="w-full animate-stage-slide"
        style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${stage.cols}, 1fr)`,
            gap: stage.cols >= 5 ? '6px' : '8px',
        }}
        >
        {cells.map((cell) => (
            <WordCard
            key={cell.id}
            cell={cell}
            fontSize={fontSize}
            disabled={disabled}
            onClick={onCellClick}
            />
        ))}
        </div>
    )
}

export default WordGrid