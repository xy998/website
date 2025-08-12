<template>
  <div class="home min-h-[calc(100vh-var(--header-height))]">
    <CountdownSnowfall />
    <div class="container">
      <div class="title">
        <span v-if="nextData?.isCurrent">{{ nextData?.name }} 快乐！</span>
        <span v-else>{{ nextData?.name }}</span>
      </div>
      <div class="countdown-container" v-if="!nextData?.isCurrent">
        <div class="time" v-if="days">
          <h1>{{ days }}</h1>
          <small>days</small>
        </div>
        <div class="time">
          <h1>{{ hours }}</h1>
          <small>hours</small>
        </div>
        <div class="time">
          <h1>{{ minutes }}</h1>
          <small>minutes</small>
        </div>
        <div class="time seconds">
          <h1>{{ seconds }}</h1>
          <small>seconds</small>
        </div>
      </div>
      <div class="celebration" v-else>
        <div class="celebration-text">
          <h2>🎉 正在享受假期 🎉</h2>
          <p>好好休息，享受美好时光！</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getTimeDifference, getNextHoliday } from "@/utils/index";

const days = ref(0);
const hours = ref("00");
const minutes = ref("00");
const seconds = ref("00");

const nextData = getNextHoliday()

const updateCountdown = () => {
  // 只有在非节假日期间才更新倒计时
  if (!nextData?.isCurrent) {
    const time = getTimeDifference(nextData?.date!);
    days.value = time.days;
    hours.value = time.hours;
    minutes.value = time.minutes;
    seconds.value = time.seconds;
  }
};

let countdownTimer: ReturnType<typeof setInterval>;

onMounted(() => {
  updateCountdown()
  // 只有在非节假日期间才启动定时器
  if (!nextData?.isCurrent) {
    countdownTimer = setInterval(updateCountdown, 1000);
  }
});

onUnmounted(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer);
  }
});

import renderSeo from "@/utils/renderSeo";

const _pageInfo = {
  title: "倒数日",
  description: "距离下一个法定节假日的天数。",
  image: "/og-image/holiday-og-imgage.png",
};

renderSeo(_pageInfo);
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -100px;

  .title {
    text-align: center;
    color: hsl(var(--primary));
    font-weight: 600;
    font-size: 1.5em;
    margin-bottom: 2rem;
  }
}

.countdown-container {
  position: relative;
  display: flex;
  z-index: 1;
}

.celebration {
  text-align: center;
  z-index: 1;
  
  .celebration-text {
    h2 {
      font-size: 2.5em;
      color: hsl(var(--primary));
      font-weight: bold;
      margin-bottom: 1rem;
      animation: bounce 2s infinite;
    }
    
    p {
      font-size: 1.2em;
      color: hsl(var(--muted-foreground));
      margin: 0;
    }
  }
}

.time {
  display: flex;
  font-size: 1.2em;
  flex-direction: column;
  margin: 0 15px;
}

.time h1 {
  font-size: 2em;
  color: hsl(var(--primary));
  font-weight: bold;
}

.seconds h1 {
  -webkit-text-fill-color: transparent;
  background: linear-gradient(45deg,
      transparent 35%,
      rgba(#fff, 0.6),
      transparent 65%) no-repeat,
    currentColor;
  background-size: 50%;
  -webkit-background-clip: text;
  background-clip: text;
  animation: light 1s infinite;
}

.time small {
  color: hsl(var(--primary));
}

@keyframes light {
  0% {
    background-position: -100%;
  }

  100% {
    background-position: 200%;
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}
</style>
