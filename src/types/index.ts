// 각 단계 설정 타입
export interface StageConfig {
    stage: number
    cols: number          // 그리드 열 개수
    rows: number          // 그리드 행 개수
    keyword: string       // 공통 키워드
    oddKeyword: string    // 틀린 키워드
}

// 각 셀 타입
export interface Cell {
    id: number
    word: string
  isOdd: boolean        // 정답(틀린 단어)인지 여부
}

// 게임 상태
export type GamePhase = 'idle' | 'playing' | 'correct' | 'wrong' | 'timeout' | 'clear'

export interface GameState {
    phase: GamePhase
    currentStageIndex: number
    score: number
}