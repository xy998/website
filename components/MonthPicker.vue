<template>
  <Popover :open="open" @update:open="(e: boolean) => (open = e)">
    <PopoverTrigger as-child @click="open = !open">
      <div
        class="mb-4 cursor-pointer inline-block text-xs text-muted-foreground"
      >
        {{ birthday }}
      </div>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <ScrollArea class="h-[201px] w-[256px]">
        <Accordion
          type="single"
          class="w-full"
          collapsible
          :default-value="checkedYear"
        >
          <AccordionItem
            v-for="item in effectiveYear"
            :key="item"
            :value="item"
          >
            <AccordionTrigger>{{ item }}</AccordionTrigger>
            <AccordionContent>
              {{ 1 - 12 }}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollArea>
    </PopoverContent>
  </Popover>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ScrollArea } from "@/components/ui/scroll-area";
import { localStg } from "@/utils/storage";

const open = ref(false);

const defaultDate = {
  maxAge: 40,
  birthday: "1998-11",
};

const effectiveYear = Array.from({ length: defaultDate.maxAge }, (_, i) => {
  return dayjs().year() - defaultDate.maxAge + i + 1 + "";
});

const localStgDate = localStg.get("birthday");

const _d = localStgDate || defaultDate.birthday;

const checkedYear = ref(dayjs(_d).year().toString());

const yearsLived = computed(() => {
  return dayjs().year() - Number(checkedYear.value);
});

const checkedMonth = ref(dayjs(_d).month() + 1);

const birthday = computed(() => {
  return dayjs(checkedYear.value + "-" + checkedMonth.value).format("YYYY-MM");
});
</script>
