<template>
  <div class="a4">
    <Popover>
      <PopoverRoot :open="open" @update:open="(e) => (open = e)">
        <PopoverTrigger as-child @click="open = !open">
          <div class="mb-4 cursor-pointer inline-block">
            <span class="text-sm mr-2">人生A4纸</span>
            <span class="text-xs text-muted-foreground">{{ birthday }}</span>
          </div>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
          <div class="h-150px p-10px flex rounded-md border">
            <div>
              <ScrollArea class="border-r" :style="{ height: '150px' }">
                <div class="py-2 px-3">
                  <div
                    v-for="y in effectiveYear"
                    :key="y"
                    class="rounded-md"
                    :class="{ activeYear: y === checkedYear }"
                    @click="
                      checkedYear = y;
                      open = false;
                    "
                  >
                    <div class="yearItem">
                      {{ y }}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>
            <div class="month">
              <div
                v-for="m in 12"
                class="item"
                :key="m"
                :class="{ activeMonth: m === checkedMonth }"
                @click="
                  checkedMonth = m;
                  open = false;
                "
              >
                {{ m }}
              </div>
            </div>
          </div>
        </PopoverContent>
      </PopoverRoot>
    </Popover>
    <div class="a4-container">
      <div
        v-for="(_, index) in 900"
        :key="index"
        class="grid-item"
        :class="{
          lived: isLived(index),
          'lived-blink': isLived(index) && index === currentItemMonth - 1,
        }"
      ></div>
    </div>

    <div>
      <div class="life mt-2">
        时间，就像捧在手里的沙子，悄无声息地就这么溜走了……
      </div>
      <div class="life mt-2">
        人生大概不过短短的900个月,画一个30X30的表格,一张A4纸就足够了。
      </div>
      <div
        class="life mt-2"
        :class="{ active: currentIndex === 0 }"
        @click="currentIndex = 0"
      >
        你今年已经
        <span
          class="num min-w-30px"
          v-animate-number="{
            num: yearsLived,
            duration: 1000,
            once: false,
          }"
          >{{ yearsLived }}</span
        >
        岁,那么你大概已经走完的这段人生。
      </div>
      <div
        class="life mt-2"
        :class="{ active: currentIndex === 1 }"
        @click="currentIndex = 1"
      >
        假设你和你的女朋友/男朋友谈恋爱
        <span class="num">6</span>
        个月,它在这张纸上是这样的。
      </div>
      <div
        class="life mt-2"
        :class="{ active: currentIndex === 2 }"
        @click="currentIndex = 2"
      >
        如果你是<span class="num">30</span> 岁上下的上班族，你的人生就是这样的。
      </div>
      <div
        class="life mt-2"
        :class="{ active: currentIndex === 3 }"
        @click="currentIndex = 3"
      >
        假如你刚有了孩子，在上幼儿园前，你能和他/她朝夕相处的日子是这样的。
      </div>
      <div
        class="life mt-2"
        :class="{ active: currentIndex === 4 }"
        @click="currentIndex = 4"
      >
        你将持续为之操心，直到他/她考上大学，那么花费的精力是这样的。
      </div>
      <div
        class="life mt-2"
        :class="{ active: currentIndex === 5 }"
        @click="currentIndex = 5"
      >
        而再假设我们的父母平均
        <span class="num">50</span>
        岁的话，他们的人生是这样的。
      </div>
      <div
        class="life mt-2"
        :class="{ active: currentIndex === 6 }"
        @click="currentIndex = 6"
      >
        假如你和父母天天见面,你能陪伴他们的时间是这样的。
      </div>
      <div
        class="life mt-2"
        :class="{ active: currentIndex === 7 }"
        @click="currentIndex = 7"
      >
        假如你们<span class="num">1 月 2 次</span
        >次次面，你能陪伴他们的时间是这样的。
      </div>
      <div
        class="life mt-2"
        :class="{ active: currentIndex === 8 }"
        @click="currentIndex = 8"
      >
        假如你们<span class="num">1 年 1 次</span>次见面，就会是这样...
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import dayjs from "dayjs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { ScrollArea } from "@/components/ui/scroll-area";
import { localStg } from "@/utils/storage";
import { PopoverRoot } from "reka-ui";

const open = ref(false);

watchEffect(() => {
  if (open.value) {
    nextTick(() => {
      let year = document.querySelector(".activeYear");
      year?.scrollIntoView({ block: "center" });
    });
  }
});

const defaultDate = {
  maxAge: 50,
  birthday: "1998-11",
};

const effectiveYear = Array.from({ length: defaultDate.maxAge }, (_, i) => {
  return dayjs().year() - defaultDate.maxAge + i + 1;
});

const localStgDate = localStg.get("birthday");

const _d = localStgDate || defaultDate.birthday;

const checkedYear = ref(dayjs(_d).year());

const yearsLived = computed(() => {
  return dayjs().year() - checkedYear.value;
});

const checkedMonth = ref(dayjs(_d).month() + 1);

const birthday = computed(() => {
  return dayjs(checkedYear.value + "-" + checkedMonth.value).format("YYYY-MM");
});
function getMonthsSince(dateString: string) {
  const startDate = dayjs(dateString);
  const now = dayjs();
  const monthsDiff = now.diff(startDate, "month");
  localStg.set("birthday", birthday.value);
  return monthsDiff;
}

const monthsLived = computed(() => getMonthsSince(birthday.value));

const currentItemMonth = computed(() => {
  if (currentIndex.value === 0) {
    return monthsLived.value;
  } else {
    return list.value[currentIndex.value].months;
  }
});
const isLived = (index: number) => {
  return index < currentItemMonth.value;
};

const currentColor = computed(() => {
  if (currentIndex.value === 0) {
    return "hsl(var(--primary))";
  } else {
    return list.value[currentIndex.value].color;
  }
});

const currentIndex = ref(0);

watch(
  () => currentIndex.value,
  () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
);

const list = ref([
  { key: 0, title: "生日", months: monthsLived.value, color: "#e3129d" },
  { key: 1, title: "恋爱", months: 6, color: "#e3129d" },
  { key: 2, title: "工作", months: 360, color: "#ec9550" },
  { key: 3, title: "孩子幼儿园", months: 32, color: "#e6bac2" },
  { key: 4, title: "孩子大学", months: 212, color: "#953633" },
  { key: 5, title: "父母50岁", months: 600, color: "#f4490c" },
  { key: 6, title: "每天见父母", months: 300, color: "#7b5f99" },
  { key: 7, title: "每月见两次父母", months: 20, color: "#564c65" },
  { key: 8, title: "每年见一次父母", months: 1, color: "#e20d19" },
]);

import renderSeo from "@/utils/renderSeo";

const _pageInfo = {
  title: "人生A4纸",
  description:
    "A4纸人生表格是2016年的网络流行语，该词语的解释为：生不过短短的900个月。在一张A4纸画一个30×30的表格，就足够了。每过一个月，在一个格子里涂掉，全部人生就在这张纸上。",
  image: "/og-image/a4-og-image.png",
  keywords: "人生A4纸,人生,A4纸,A4纸人生,人生A4,A4纸人生计算器",
};

renderSeo(_pageInfo);
</script>
<style scoped lang="scss">
.a4 {
  padding: 20px;
  position: relative;
  margin: 20px auto;
  max-width: 651px;

  .a4-container {
    max-width: 651px;
    margin: 10px auto;
    display: grid;
    grid-template-columns: repeat(30, 1fr);
    gap: 2px;

    .grid-item {
      aspect-ratio: 1;
      background-color: hsl(var(--input));
      border-radius: 2px;

      &.lived {
        background: v-bind(currentColor);
        opacity: 0.4;
      }
    }

    .lived-blink {
      animation: blink 1s infinite;
    }
  }
}

.month {
  display: grid;
  width: 150px;
  padding: 6px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  aspect-ratio: 1;
  position: relative;

  .activeMonth {
    font-weight: 600;
    color: hsl(var(--primary-foreground));
    background-color: hsl(var(--primary));
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: 4px;
    z-index: 1;
  }
}

.yearItem {
  line-height: 2rem;
  padding: 0 8px;
}

.activeYear {
  font-weight: 600;
  color: hsl(var(--primary-foreground));
  background-color: hsl(var(--primary));
}

@keyframes blink {
  0% {
    opacity: 0.4;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.4;
  }
}

.life {
  position: relative;
  cursor: pointer;

  &.active::after {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    top: 16px;
    left: -16px;
    transform: translateY(-50%);
    background-color: hsl(var(--primary));
    animation: blink 1s infinite;
  }

  .num {
    font-size: 20px;
    font-weight: 600;
    color: gold;
    padding: 4px;
  }
}
</style>
