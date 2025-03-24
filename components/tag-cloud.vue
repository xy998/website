<template>
  <div id="tag-cloud" ref="tagCloud"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';

// 定义 Props
const props = defineProps({
  tags: {
    type: Array as () => string[],
    required: true,
  },
  radius: {
    type: Number,
    default: 200,
  },
  maxFont: {
    type: Number,
    default: 30,
  },
  rotateAngleXbase: {
    type: Number,
    default: 500,
  },
  rotateAngleYbase: {
    type: Number,
    default: 500,
  },
});

// 获取 DOM 元素
const tagCloud = ref<HTMLElement | null>(null);

// 初始化标签云
onMounted(() => {
  if (!tagCloud.value) return;

  const tagContainer = tagCloud.value;
  const tags: HTMLElement[] = [];

  const api = {
    add: function (opts: string[]) {
      const setting = opts || [];
      const tagGroup = document.createDocumentFragment();
      for (let i = 0, length = setting.length; i < length; i++) {
        const tag = document.createElement('img');
        tag.src = setting[i];
        tag.setAttribute('class', 'tag');
        tag.style.cssText +=
          'position:absolute;left:0;top:0;';
        tagGroup.appendChild(tag);
        tags.push(tag);
      }
      tagContainer.appendChild(tagGroup);
      tagContainer.style.position = 'relative';
      return this;
    },
    config: function (opts: Partial<typeof props>) {
      const options = {
        radius: props.radius,
        maxFont: props.maxFont,
        rotateAngleXbase: props.rotateAngleXbase,
        rotateAngleYbase: props.rotateAngleYbase,
      };
      const setting = { ...options, ...opts };
      const allTag: { x: number; y: number; z: number; ele: HTMLElement }[] = [];
      const rotateAngleX = Math.PI / setting.rotateAngleXbase; // 固定旋转速度
      const rotateAngleY = Math.PI / setting.rotateAngleYbase; // 固定旋转速度

      // 动态调整半径
      const containerWidth = tagContainer.offsetWidth;
      const containerHeight = tagContainer.offsetHeight;
      const dynamicRadius = Math.min(containerWidth, containerHeight) / 2;

      function init(r: number) {
        for (let i = 0, length = tags.length; i < length; i++) {
          const angleX = Math.acos((2 * (i + 1) - 1) / length - 1);
          const angleY = angleX * Math.sqrt(length * Math.PI);
          const x = r * Math.sin(angleX) * Math.cos(angleY);
          const y = r * Math.sin(angleX) * Math.sin(angleY);
          const z = r * Math.cos(angleX);
          const tag = {
            x: x,
            y: y,
            z: z,
            ele: tags[i],
          };
          allTag.push(tag);
        }
      }

      function setPosition(
        tag: { x: number; y: number; z: number; ele: HTMLElement },
        r: number,
        maxFont: number
      ) {
        tag.ele.style.transform =
          'translate(' +
          (tag.x + containerWidth / 2 - tag.ele.offsetWidth / 2) +
          'px,' +
          (tag.y + containerHeight / 2 - tag.ele.offsetHeight / 2) +
          'px)';
        tag.ele.style.opacity = tag.z / r / 2 + 0.7;
      }

      function rotateX(tag: { y: number; z: number }) {
        const cos = Math.cos(rotateAngleX);
        const sin = Math.sin(rotateAngleX);
        const y1 = tag.y * cos - tag.z * sin;
        const z1 = tag.y * sin + tag.z * cos;
        tag.y = y1;
        tag.z = z1;
      }

      function rotateY(tag: { x: number; z: number }) {
        const cos = Math.cos(rotateAngleY);
        const sin = Math.sin(rotateAngleY);
        const x1 = tag.z * sin + tag.x * cos;
        const z1 = tag.z * cos - tag.x * sin;
        tag.x = x1;
        tag.z = z1;
      }

      init(dynamicRadius);
      setInterval(function () {
        for (let i = 0; i < tags.length; i++) {
          rotateX(allTag[i]);
          rotateY(allTag[i]);
          setPosition(allTag[i], dynamicRadius, setting.maxFont);
        }
      }, 17);
    },
  };

  api.add(props.tags).config(props);
});
</script>

<style scoped>
#tag-cloud {
  width: 300px;
  height: 300px;
  margin: 2% auto;
  position: relative;
}
</style>