<template>
  <div class="home min-h-[calc(100vh-var(--header-height))]">
    <CountdownSnowfall />
    <div class="container">
      <div class="title">{{ nextData?.name }}</div>
      <div class="countdown-container">
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
  const time = getTimeDifference(nextData?.date!);
  days.value = time.days;
  hours.value = time.hours;
  minutes.value = time.minutes;
  seconds.value = time.seconds;
};

let countdownTimer: ReturnType<typeof setInterval>;

onMounted(() => {
  updateCountdown()
  countdownTimer = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  clearInterval(countdownTimer);
});

import renderSeo from "@/utils/renderSeo";

const _pageInfo = {
  title: "倒数日",
  description: "距离下一个法定节假日的天数。",
  image: "https://xxyu.online/og-image/holiday-og-imgage.png",
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
    text-align: left;
    color: hsl(var(--primary));
    font-weight: 600;
  }
}

.countdown-container {
  position: relative;
  display: flex;
  z-index: 1;
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
</style>
