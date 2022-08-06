<template>
  <form @submit.prevent>
    <section>
      Cols: <input v-model="newCols" type="number" min="5" max="100" />
      Rows: <input v-model="newRows" type="number" min="5" max="100" />
      Bombs: <input v-model="newBombs" type="number" min="10" max="5000" />
    </section>
    <section class="buttons">
      <button @click="onApply">Apply &amp; Restart</button>
    </section>
  </form>
</template>

<style lang="scss" scoped>
.buttons {
  margin-top: 1rem;
}
</style>

<script setup lang="ts">
import { ref } from 'vue-demi';
import { useGameStore } from '../useGameStore'

const { init, cols, rows, bombs } = useGameStore()!
const newCols = ref(cols.value)
const newRows = ref(rows.value)
const newBombs = ref(bombs.value)
function onApply(): void {
  init({ cols: newCols.value, rows: newRows.value, bombs: newBombs.value })
}
</script>
