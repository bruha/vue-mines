<template>
  <span
    class="cell"
    :class="{
      'cell--opened': cell.isOpened,
    }"
    @click.left="onClickLeft(cell)"
    @click.right.prevent="onClickRight(cell)"
  >
    {{ showValue(cell) }}
  </span>
</template>

<style lang="scss">
.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  background: #ddd;
  text-align: center;
  cursor: default;

  &--opened, &:not(&--opened):hover {
    filter: brightness(0.92);
  }
}
</style>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue-demi'
import type { Cell } from '../types'

interface Props {
  cell: Cell
}
defineProps<Props>()

const emit = defineEmits(['open', 'flag'])
const onClickLeft = (cell: Cell) => {
  if (!cell.isOpened) {
    emit('open', cell)
  }
}
const onClickRight = (cell: Cell) => {
  if (cell.isOpened) {
    emit('open', cell, { isForced: true })
  } else {
    emit('flag', cell)
  }
}

const showValue = (cell: Cell) => {
  if (cell.isOpened) {
    if (cell.hasBomb) {
      return '💣'
    } else {
      return cell.bombsNear
    }
  } else if (cell.hasFlag) {
    return '🚩'
  } else {
    return ''
  }
}
</script>
