<template>
  <div>
    <h1>Mines</h1>
    <Settings />
    <Field />
  </div>
</template>

<script setup lang="ts">
import Field from './components/field.vue'
import Settings from './components/settings.vue'
import { useProvideGameStore } from './useGameStore'
useProvideGameStore()
</script>
