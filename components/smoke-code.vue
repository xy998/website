<template>
  <div ref="wrapper" class="smoke-text-wrapper" @click="reveal">
    <!-- 原文字（始终显示，用于撑开容器） -->
    <span class="original-text text-muted-foreground" :class="{ '!opacity-100': revealed }">{{ text }}</span>
    <!-- canvas 遮罩 -->
    <canvas v-if="!revealed" ref="canvas" class="smoke-canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue";

const props = defineProps<{
  text: string;
  width: number; // 必需，canvas宽度
  height?: number; // 可选，canvas高度，如果不提供则自动适应
  fontSize?: number; // 可选，默认16px
}>();

const wrapper = ref<HTMLDivElement>();
const canvas = ref<HTMLCanvasElement>();
const revealed = ref(false);

let particles: any[] = [];
let ctx: CanvasRenderingContext2D | null = null;

function createParticles(width: number, height: number) {
  particles = [];
  for (let i = 0; i < width * height * 0.15; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      alpha: Math.random(),
      size: Math.random() * 2,
      speedX: (Math.random() - 0.5) * 1.5,
      speedY: (Math.random() - 0.5) * 1.5,
    });
  }
}

function drawParticles() {
  if (!ctx || revealed.value) return;

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  particles.forEach((p) => {
    p.x += p.speedX;
    p.y += p.speedY;
    p.alpha -= 0.003;
    if (p.alpha <= 0) {
      p.x = Math.random() * ctx!.canvas.width;
      p.y = Math.random() * ctx!.canvas.height;
      p.alpha = 1;
    }

    ctx!.beginPath();
    ctx!.fillStyle = `rgba(200,200,200,${p.alpha})`;
    ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx!.fill();
  });

  requestAnimationFrame(drawParticles);
}

function reveal() {
  if (revealed.value) return; // 只执行一次
  revealed.value = true;
}

onMounted(async () => {
  await nextTick(); // 等待DOM渲染完成
  
  const cvs = canvas.value!;
  cvs.width = props.width;
  
  // 如果没有提供height，则使用容器的实际高度
  if (props.height) {
    cvs.height = props.height;
  } else {
    // 等待一下确保文字已经渲染
    await nextTick();
    cvs.height = wrapper.value!.offsetHeight;
  }

  ctx = cvs.getContext("2d");
  createParticles(cvs.width, cvs.height);
  drawParticles();
});
</script>

<style scoped>
.smoke-text-wrapper {
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: pointer;
}

.original-text {
  display: inline-block;
  opacity: 0; /* 默认隐藏原文字，但保持容器尺寸 */
  pointer-events: none; /* 防止干扰点击事件 */
  transition: opacity 0.3s ease; /* 添加过渡效果 */
}

.original-text.revealed {
  opacity: 1; /* 点击后显示原文字 */
}

.smoke-canvas {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none; /* 防止canvas干扰点击事件 */
}
</style>
