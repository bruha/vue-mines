<template>
  <div>
    <h1>Mines</h1>
    <Field />
  </div>
</template>

<script setup lang="ts">
import Field from './components/field.vue'
import { useProvideGameStore } from './useGameStore'

useProvideGameStore()
</script>
