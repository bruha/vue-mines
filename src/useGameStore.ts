import { reactive, ref, Ref } from 'vue-demi'
import { createInjectionState } from '@vueuse/shared'
import type { Cell, Coords, Field } from './types'

const [useProvideGameStore, useGameStore] = createInjectionState(() => {
  const cols: Ref<number> = ref(10)
  const rows: Ref<number> = ref(10)
  const bombs: Ref<number> = ref(20)
  const field: Ref<Field> = ref([])
  const isFailed: Ref<boolean> = ref(false)

  function init(
    { cols: newCols, rows: newRows, bombs: newBombs }:
    { cols?: number, rows?: number, bombs?: number } = {}
  ): void {
    if (newCols) cols.value = newCols
    if (newRows) rows.value = newRows
    if (newBombs) bombs.value = newBombs
    isFailed.value = false
    field.value = Array.from({ length: cols.value * rows.value }, (_el, i) => reactive({
      isOpened: false,
      hasBomb: false,
      hasFlag: false,
      bombsNear: 0,
      coords: {
        col: i % cols.value,
        row: Math.floor(i / cols.value),
      },
    }))
    placeBombs()
  }

  function openCell(coords: Coords, options = { isForced: false }): void {
    const cell = getCell(coords)
    if (!cell) return
    cell.isOpened = true
    if (cell.hasBomb) {
      isFailed.value = true
      return
    }
    let nearest: Cell[]
    if (cell.bombsNear === 0 || options.isForced) {
      nearest = getNearestCells(coords)
      if (options.isForced) {
        nearest
          .filter((cell) => !cell.isOpened && !cell.hasFlag)
          .forEach((cell) => {
            openCell(cell.coords)
          })
      } else {
        nearest
          .filter((cell) => !cell.isOpened)
          .forEach((cell) => {
            if (!cell.hasBomb) openCell(cell.coords)
          })
      }
    }
  }

  function flagCell(coords: Coords): void {
    const cell = getCell(coords)
    if (cell && !cell.isOpened) {
      cell.hasFlag = !cell.hasFlag
    }
  }

  function placeBombs(): void {
    let cellsWithoutBomb: number = field.value.length
    for (let i = 0; i < bombs.value; i++) {
      const newBombIndex: number = Math.floor(Math.random() * cellsWithoutBomb)
      placeBombByIndex(newBombIndex)
      cellsWithoutBomb--
    }
    calculateNumbers()
  }
  function placeBombByIndex(index: number): void {
    while (field.value[index].hasBomb && index < field.value.length - 1)
      index++
    field.value[index].hasBomb = true
    field.value[index].bombsNear = null
  }
  function getNearestCells({ col, row }: Coords): Cell[] {
    const res = [
      getCell({ col: col - 1, row: row - 1 }),
      getCell({ col, row: row - 1 }),
      getCell({ col: col + 1, row: row - 1 }),
      getCell({ col: col - 1, row }),
      getCell({ col: col + 1, row }),
      getCell({ col: col - 1, row: row + 1 }),
      getCell({ col, row: row + 1 }),
      getCell({ col: col + 1, row: row + 1 }),
    ].filter((cell) => cell != null)
    return res as Cell[]
  }
  function calculateNumbers(): void {
    field.value.forEach((cell: Cell, i: number) => {
      if (!cell.hasBomb) {
        cell.bombsNear = getNearestCells(cell.coords).reduce(
          (sum, cell) => {
            if (cell.hasBomb) sum++
            return sum
          },
          0
        )
      }
    })
  }
  function getCell(coords: Coords): Cell | null {
    if (
      coords.col < 0 ||
      coords.col >= cols.value ||
      coords.row < 0 ||
      coords.row >= rows.value
    ) {
      return null
    } else {
      return field.value[coords.row * cols.value + coords.col]
    }
   }

  return { init, field, cols, rows, bombs, isFailed, openCell, flagCell }
})

export { useProvideGameStore, useGameStore }
