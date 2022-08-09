<template>
  <div>
    <h4>Game
      <strong v-show="isLost">LOST</strong>
      <strong v-show="isWon">WON</strong>
    </h4>
    <div class="field">
      <Cell v-for="cell in field" :key="`${cell.coords.col}-${cell.coords.row}`" :cell="cell" :is-game-over="isGameOver" @open="onOpen" @flag="onFlag" />
    </div>
    <h5>Bombs left: {{ bombsLeft }}</h5>
  </div>
</template>

<style lang="scss" scoped>
.field {
  display: grid;
  grid-template-columns: repeat(v-bind(colsAsString), v-bind(size));
  grid-template-rows: repeat(v-bind(rowsAsString), v-bind(size));
  grid-gap: 1px;
  justify-content: center;
  margin: 1rem auto;
}
</style>

<script setup lang="ts">
import { ref } from 'vue-demi'
import Cell from './cell.vue'
import type { Cell as ICell } from '../types'
import { useGameStore } from '../useGameStore'
import { computed } from '@vue/reactivity'

const { field, cols, rows, bombsLeft, isLost, isWon, openCell, flagCell } = useGameStore()!
const size = ref('30px')
const colsAsString = computed<string>(() => cols.value.toString())
const rowsAsString = computed<string>(() => rows.value.toString())
const isGameOver = computed<boolean>(() => isLost.value || isWon.value)

const onOpen = (cell: ICell, options: { isForced: boolean }) => {
  if (isGameOver.value) return
  openCell(cell.coords, options)
}
const onFlag = (cell: ICell) => {
  if (isGameOver.value) return
  flagCell(cell.coords)
}
</script>
