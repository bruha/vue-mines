<template>
  <div>
    <h1>Mines</h1>
    <h6>Click to Open the Cell. Right click to Flag the Bomb</h6>
    <Settings />
    <Field :key="fieldIndex" />
  </div>
</template>

<script setup lang="ts">
import Field from './field.vue'
import Settings from './settings.vue'
import { useGameStore } from '../useGameStore'
const { fieldIndex, init } = useGameStore()!
init()
</script>
