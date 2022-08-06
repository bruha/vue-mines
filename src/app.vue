<template>
  <Game />
</template>

<script setup lang="ts">
import Game from './components/game.vue'
import { useProvideGameStore } from './useGameStore'
useProvideGameStore()
</script>
