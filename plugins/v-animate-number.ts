interface Params {
  num: string | number;
  duration?: number;
  decimalPlaces?: number;
  once?: boolean;
  format?: (v: string) => string;
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('animateNumber', {
    mounted(el, binding) {
      el._update = (binding: any) => {
        const { num, duration = 1000, decimalPlaces = 0, format = (v: string) => v } = binding.value;
  
        if (num === "") {
          el.innerText = "";
          return;
        }
  
        // 如果是数字
        if (!isNaN(Number(num))) {
          const startNumber = el._last_num || 0;
          const startTime = performance.now();
          const targetNumber = Number(num);
  
          const updateNumber = (timestamp: number) => {
            const elapsed = timestamp - startTime;
            const progress = elapsed / duration;
  
            if (progress >= 1) {
              el.innerText = format(targetNumber.toFixed(decimalPlaces));
              el._last_num = targetNumber;
              return;
            }
  
            const currentNumber = startNumber + (targetNumber - startNumber) * Math.min(progress, 1);
  
            const num = currentNumber.toFixed(decimalPlaces);
            el.innerText = format(num);
  
            requestAnimationFrame(updateNumber);
          };
  
          requestAnimationFrame(updateNumber);
        } else {
          el.innerText = num as string;
        }
      };
      el._update(binding);
    },
  
    updated(el, binding) {
      const { once = true } = binding.value;
      if (once) return;
      el._update(binding);
    }
  })
})
