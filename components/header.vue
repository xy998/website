<template>
  <header
    class="bg-background/75 backdrop-blur border-b border-gray-200 dark:border-gray-800 -mb-px sticky top-0 z-50 lg:mb-0 lg:border-0"
  >
    <div
      class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between gap-3 h-[--header-height]"
    >
      <div class="lg:flex-1 items-center gap-1.5 hidden md:flex">
        <img :src="Logo" :alt="title" class="w-10 h-10" />
      </div>
      <div class="mr-2 text-base flex-shrink-0 md:hidden">
        <Sheet :open="open" v-model="open">
          <SheetTrigger>
            <Icon icon="line-md:menu-unfold-left" @click="open = true" />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>
                <img :src="Logo" :alt="title" class="w-10 h-10 mx-auto" />
              </SheetTitle>
              <SheetDescription>
                <ScrollArea class="h-full">
                  <div class="p-4">
                    <div
                      v-for="nav in navMap"
                      :key="nav.path"
                      class="border-b-1 mb-2"
                      @click="open = false"
                    >
                      <NuxtLink :to="nav.path" class="hover:text-primary">
                        {{
                          nav.meta.i18nKey
                            ? $t(nav.meta.i18nKey)
                            : nav.meta.title
                        }}
                      </NuxtLink>
                    </div>
                  </div>
                </ScrollArea>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <ul class="items-center gap-x-8 hidden md:flex">
        <li class="relative" v-for="nav in navMap" :key="nav.path">
          <NuxtLink :to="nav.path" class="hover:text-primary">
            {{ nav.meta.i18nKey ? $t(nav.meta.i18nKey) : nav.meta.title }}
          </NuxtLink>
        </li>
      </ul>
      <div class="flex items-center justify-end lg:flex-1 gap-1.5">
        <div
          class="cursor-pointer rounded-md hover:bg-muted transition-all p-2"
        >
          <Icon
            @click="mode === 'light' ? (mode = 'dark') : (mode = 'light')"
            :icon="
              mode === 'dark'
                ? 'line-md:sunny-outline-to-moon-loop-transition'
                : 'line-md:sun-rising-loop'
            "
          />
        </div>

        <div
          class="cursor-pointer rounded-md hover:bg-muted transition-all p-2"
        >
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Icon icon="heroicons:language-16-solid" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup v-model="lang">
                <DropdownMenuRadioItem value="zh">
                  <div class="w-full flex gap-1 items-center justify-start">
                    <Icon icon="circle-flags:cn" /> 中文
                  </div>
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="en">
                  <div class="flex gap-1 items-center justify-start">
                    <Icon icon="circle-flags:us" /> English
                  </div>
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import Logo from "@/assets/svg/logo.svg";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { ScrollArea } from "@/components/ui/scroll-area";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mode = useColorMode();

const { locale, setLocale } = useI18n();

import { localStg } from "@/utils/storage";

const localLang = localStg.get("lang");

const lang = ref(localLang || 'zh');

watchEffect(() => {
  if (lang.value === "zh") {
    setLocale("zh");
    localStg.set("lang", 'zh');
  }
  if (lang.value === "en") {
    setLocale("en");
    localStg.set("lang", 'en');
  }
});

const open = ref(false);

const baseInfo = useBaseInfo();

const title = ref(baseInfo.title + "的网站logo");

const navList = [
  {
    path: "/",
    name: "index",
    meta: {
      title: "xxyu",
      i18nKey: "route.xxyu",
    },
  },
  {
    path: "/a4",
    name: "A4",
    meta: {
      title: "a4",
      i18nKey: "route.a4",
    },
  },
  // {
  //   path: "/10000",
  //   name: "10000",
  //   meta: {
  //     title: "10000",
  //     i18nKey: "route.10000",
  //   },
  // },
  {
    path: "/holiday",
    name: "holiday",
    meta: {
      title: "holiday",
      i18nKey: "route.holiday",
    },
  },
];
const navMap = computed(() => {
  return navList.map((router) => {
    return {
      ...router,
      path:
        locale.value === 'zh'
          ? router.path
          : `/${locale.value}${router.path}`,
    };
  });
});
</script>
<style lang="scss" scoped>
.router-link-exact-active {
  @apply text-primary;
  font-weight: 600;
}
</style>
