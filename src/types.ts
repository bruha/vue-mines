export interface Coords {
  col: number
  row: number
}

export interface Cell {
  isOpened: boolean
  hasBomb: boolean
  hasFlag: boolean
  bombsNear: number | null
  coords: Coords
}

export type Field = Cell[]
