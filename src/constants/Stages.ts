import type { StageConfig } from '../types'

// 5 stages: 2x2 -> 3x3 -> 4x4 -> 5x5 -> 6x6
export const STAGES: StageConfig[] = [
    {
        stage: 1,
        cols: 2,
        rows: 2,
        keyword: 'DC&M',
        oddKeyword: 'DCNM',
    },
    {
        stage: 2,
        cols: 3,
        rows: 3,
        keyword: 'DC&M',
        oddKeyword: 'DCAM',
    },
    {
        stage: 3,
        cols: 4,
        rows: 4,
        keyword: 'DC&M',
        oddKeyword: 'DC8M',
    },
    {
        stage: 4,
        cols: 5,
        rows: 5,
        keyword: 'DC&M',
        oddKeyword: 'D C&M',
    },
    {
        stage: 5,
        cols: 6,
        rows: 6,
        keyword: 'DC&M',
        oddKeyword: 'DC&N',
    },
]

export const TIMER_SECONDS = 5
export const TOTAL_STAGES = STAGES.length
