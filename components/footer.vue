<template>
 <footer class="text-center text-sm text-gray-500 dark:text-gray-400 py-4 underline cursor-pointer">
    <NuxtLink target="_blank" :to="baseInfo.githubLink">Copyright © 2024-present xxyu</NuxtLink>
  </footer>
</template>
<script setup lang="ts">
const baseInfo = useBaseInfo();
</script>