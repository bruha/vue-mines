<template>
  <div>
    <h4>Game <span v-show="isFailed">FAILED</span></h4>
    <div class="field">
      <Cell v-for="cell in field" :cell="cell" @open="onOpen" @flag="onFlag" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.field {
  display: grid;
  grid-template-columns: repeat(v-bind(colsAsString), v-bind(size));
  grid-template-rows: repeat(v-bind(rowsAsString), v-bind(size));
  grid-gap: 1px;
  justify-content: center;
}
</style>

<script setup lang="ts">
import { ref } from 'vue-demi'
import Cell from './cell.vue'
import type { Cell as ICell } from '../types'
import { useGameStore } from '../useGameStore'
import { computed } from '@vue/reactivity'

const { init, field, cols, rows, isFailed, openCell, flagCell } = useGameStore()!
init()

const size = ref('30px')
const colsAsString = computed(() => cols.value.toString())
const rowsAsString = computed(() => rows.value.toString())

const onOpen = (cell: ICell, options: { isForced: boolean }) => {
  if (isFailed.value) return
  openCell(cell.coords, options)
}
const onFlag = (cell: ICell) => {
  if (isFailed.value) return
  flagCell(cell.coords)
}
</script>
