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
  grid-template-columns: repeat(v-bind(cols), v-bind(size));
  grid-template-rows: repeat(v-bind(rows), v-bind(size));
  grid-gap: 1px;
}
</style>

<script setup lang="ts">
import { ref } from 'vue-demi'
import Cell from './cell.vue'
import type { Cell as ICell } from '../types'
import { useGameStore } from '../useGameStore'

const cols = ref('10')
const rows = ref('10')
const bombs = ref(20)
const size = ref('30px')

const { init, field, isFailed, openCell, flagCell } = useGameStore()!
init(+cols.value, +rows.value, bombs.value)

const onOpen = (cell: ICell, options: { isForced: boolean }) => {
  if (isFailed.value) return
  openCell(cell.coords, options)
}
const onFlag = (cell: ICell) => {
  if (isFailed.value) return
  flagCell(cell.coords)
}
</script>
