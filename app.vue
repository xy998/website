<template>
  <TooltipProvider>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </TooltipProvider>
</template>

<script lang="ts" setup>
import { TooltipProvider } from "@/components/ui/tooltip";
</script>
