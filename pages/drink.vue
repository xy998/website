<template>
  <div class="min-h-screen lg:p-8 max-w-screen-md">
    <div class="mx-auto rounded-xl shadow-lg lg:p-6 space-y-6">
      <h1 class="text-3xl font-bold text-center text-foreground mb-6">
        白酒啤酒换算器
      </h1>

      <div class="p-4 rounded-lg text-center" ref="resultRef">
        <div class="text-sm text-muted-foreground mb-2">当前换算结果：</div>
        <div class="text-4xl font-bold text-primary">
          <span v-animate-number="{
            num: currentFormula || 0,
            duration: 500,
            once: false,
          }"
          ></span>
          <span class="text-lg text-muted-foreground">ml</span>
        </div>
        <div class="text-sm text-muted-foreground mt-1">
          啤酒体积
        </div>
      </div>

      <div class="space-y-4">

        <div class="space-y-2">
          <Label for="baijiuABV">
            白酒酒精度 (%)
          </Label>
          <Input
            id="baijiuABV"
            v-model="baijiuABV"
            type="number"
            min="0"
            max="100"
            step="0.1"
            @blur="saveToStorage"
          />
        </div>

        <div class="space-y-2">
          <Label for="beerABV">
            啤酒酒精度 (%)
          </Label>
          <Input
            id="beerABV"
            v-model="beerABV"
            type="number"
            min="0"
            max="100"
            step="0.1"
            @blur="saveToStorage"
          />
        </div>

        <div class="space-y-2">
          <Label for="baijiuVolume">
            白酒毫升数 (ml)
          </Label>
          <Input
            ref="baijiuVolumeRef"
            v-model="baijiuVolume"
            type="number"
            placeholder="输入白酒毫升数"
            min="0"
            @blur="updateFormula"
          />
        </div>

        <Button @click="calculateBeerVolume" class="w-full">
          计算
        </Button>
      </div>

      <!-- 计算逻辑 -->
      <div class="p-4 rounded-lg">
        <h3 class="text-lg font-semibold mb-3 text-foreground">计算方法逻辑</h3>
        <div class="text-sm space-y-3">
          <p>1. 计算白酒的纯酒精量：<br>
            纯酒精量 = 白酒体积 × 白酒酒精度</p>
          <p>2. 计算啤酒的体积（保持纯酒精量相等）：<br>
            啤酒体积 = 纯酒精量 ÷ 啤酒酒精度</p>
          <p>因此，通过计算纯酒精含量，确保两者摄入的酒精量相等。</p>
        </div>
      </div>


      <div class="p-4 rounded-lg">
        <h3 class="text-lg font-semibold mb-3 text-foreground">考虑因素</h3>
        <p class="text-sm text-muted-foreground mb-3">
          为了确保白酒和啤酒饮酒的公平性，我们考虑以下因素：
        </p>
        <ul class="text-sm space-y-2 text-muted-foreground">
          <li class="flex items-start gap-2">
            <span class="text-primary font-medium">•</span>
            <span><strong class="text-foreground">酒精量</strong>：通过计算纯酒精含量（体积 × 酒精度），确保两者摄入的酒精量相等。</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-primary font-medium">•</span>
            <span><strong class="text-foreground">液体体积</strong>：啤酒体积较大，容易“撑肚子”，因此在计算啤酒体积后减去一个调整系数（默认15%），以减少饮用量，提高体验。</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-primary font-medium">•</span>
            <span><strong class="text-foreground">饮酒体验</strong>：白酒小口慢饮，啤酒可能大口快喝，节奏和场合会影响感受，建议分次饮用。</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-primary font-medium">•</span>
            <span><strong class="text-foreground">个人差异</strong>：体质、酒精耐受性等因人而异，计算结果仅供参考，饮酒需适量。</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 响应式数据
const baijiuVolume = ref('')
const baijiuABV = ref('53')
const beerABV = ref('8')
const currentFormula = ref('')
const baijiuVolumeRef = ref<HTMLInputElement | null>(null)
const resultRef = ref<HTMLDivElement | null>(null)

// 保存到localStorage
const saveToStorage = () => {
  if (baijiuABV.value) {
    localStorage.setItem('baijiuABV', baijiuABV.value)
  }
  if (beerABV.value) {
    localStorage.setItem('beerABV', beerABV.value)
  }
  updateFormula()
}

// 加载本地存储的数据
onMounted(() => {
  // 加载酒精度设置
  const savedBaijiuABV = localStorage.getItem('baijiuABV')
  const savedBeerABV = localStorage.getItem('beerABV')
  
  if (savedBaijiuABV) {
    baijiuABV.value = savedBaijiuABV
  }
  if (savedBeerABV) {
    beerABV.value = savedBeerABV
  }
  updateFormula()
})

// 更新公式显示
const updateFormula = () => {
  const volume = parseFloat(baijiuVolume.value) || 0
  const baijiu = parseFloat(baijiuABV.value) || 53
  const beer = parseFloat(beerABV.value) || 8
  
  if (beer > 0 && volume > 0) {
    const pureAlcohol = volume * (baijiu / 100)
    const beerVolume = (pureAlcohol / (beer / 100))
    const adjustedBeerVolume = (beerVolume * 0.85).toFixed(2)
    currentFormula.value = adjustedBeerVolume
  } else {
    currentFormula.value = ''
  }
}

// 计算啤酒体积
const calculateBeerVolume = () => {
  baijiuVolumeRef.value?.blur()
  const volume = parseFloat(baijiuVolume.value)
  const baijiu = parseFloat(baijiuABV.value) / 100
  const beer = parseFloat(beerABV.value) / 100

  // 保存到localStorage
  saveToStorage()

  // 验证输入
  if (isNaN(volume) || volume <= 0) {
    return
  }
  
  if (isNaN(baijiu) || baijiu <= 0 || isNaN(beer) || beer <= 0) {
    return
  }

  // 验证啤酒度数小于白酒度数
  if (beer >= baijiu) {
    return
  }

  // 计算纯酒精量和啤酒体积
  const pureAlcohol = volume * baijiu
  const beerVolume = pureAlcohol / beer

  // 更新公式显示
  updateFormula()

  nextTick(() => {
    resultRef.value?.scrollIntoView({ behavior: 'smooth' })
  })
}

// SEO 设置
// useHead({
//   title: '白啤酒换算器',
//   meta: [
//     { name: 'description', content: '白酒啤酒换算器 - 计算白酒和啤酒的等效酒精量' }
//   ]
// })

import renderSeo from "@/utils/renderSeo";

const _pageInfo = {
  title: "白啤酒换算器",
  description:
    "白酒啤酒换算器 - 计算白酒和啤酒的等效酒精量",
  image: "/og-image/drink-og-image.png",
  keywords: "白酒啤酒换算器,白酒啤酒,啤酒换算器,白酒换算器,啤酒换算,白酒换算,啤酒换算器,白酒换算器,啤酒换算,白酒换算",
};

renderSeo(_pageInfo);
</script>