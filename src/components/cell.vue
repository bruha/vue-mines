<template>
  <span
    class="cell"
    :class="{
      'cell--opened': cell.isOpened,
      'cell--inactive': isFailed,
    }"
    @click.left="onClickLeft(cell)"
    @click.right.prevent="onClickRight(cell)"
  >
    {{ showValue(cell) }}
  </span>
</template>

<style lang="scss" scoped>
.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  background: #ddd;
  text-align: center;
  cursor: default;

  &--opened {
    filter: brightness(0.92);
  }
  &:not(&--opened):not(&--inactive):hover {
    filter: brightness(0.92);
    cursor: pointer;
  }
}
</style>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue-demi'
import type { Cell } from '../types'

interface Props {
  cell: Cell,
  isFailed: boolean
}
defineProps<Props>()

const emit = defineEmits(['open', 'flag'])
const onClickLeft = (cell: Cell): void => {
  if (!cell.isOpened) {
    emit('open', cell)
  }
}
const onClickRight = (cell: Cell): void => {
  if (cell.isOpened) {
    emit('open', cell, { isForced: true })
  } else {
    emit('flag', cell)
  }
}

const showValue = (cell: Cell): string => {
  if (cell.isOpened) {
    if (cell.hasBomb) {
      return '💣'
    } else {
      return cell.bombsNear?.toString() ?? ''
    }
  } else if (cell.hasFlag) {
    return '🚩'
  } else {
    return ''
  }
}
</script>
