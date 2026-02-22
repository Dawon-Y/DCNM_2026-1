import type { Cell, StageConfig } from '../types'

/**
 * 그리드 셀 배열 생성
 * - 전체 cols*rows 개 중 딱 1개만 oddKeyword, 나머지는 keyword
 * - 정답(odd) 위치는 랜덤
 */
export function generateGrid(config: StageConfig): Cell[] {
  const total = config.cols * config.rows
  const oddIndex = Math.floor(Math.random() * total)

    return Array.from({ length: total }, (_, i) => ({
        id: i,
        word: i === oddIndex ? config.oddKeyword : config.keyword,
        isOdd: i === oddIndex,
    }))
}