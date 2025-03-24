<template>
  <div class="snowfall" ref="snowfallContainer"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const snowfallContainer = ref<HTMLElement | null>(null)
const containerWidth = ref(0)

const createSnowFlake = () => {
  const snowFlake = document.createElement('div')
  snowFlake.classList.add('snowflake')
  snowFlake.classList.add('bg-black')
  snowFlake.classList.add('dark:bg-white')

  if (snowfallContainer.value) {
    const width = snowfallContainer.value.offsetWidth
    snowFlake.style.left = `${Math.random() * width}px`
    snowFlake.style.animationDuration = `${Math.random() * 3 + 2}s`
    snowFlake.style.opacity = `${Math.random()}`
    snowFlake.style.width = `${Math.random() * 10 + 10}px`
    snowFlake.style.height = `${Math.random() * 10 + 10}px`

    snowfallContainer.value.appendChild(snowFlake)

    setTimeout(
      () => {
        snowFlake.remove()
      },
      parseFloat(snowFlake.style.animationDuration) * 5000,
    )
  }
}

onMounted(() => {
  if (snowfallContainer.value) {
    containerWidth.value = snowfallContainer.value.offsetWidth
    setInterval(createSnowFlake, 200)
  }
})
</script>

<style lang="scss">
.snowfall {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
}

.snowflake {
  position: absolute;
  top: -20px;
  animation: fall linear forwards;
}

@keyframes fall {
  to {
    transform: translateY(105vh);
  }
}
</style>
