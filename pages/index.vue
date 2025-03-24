<template>
  <div class="flex flex-col md:flex-row lg:flex-row mt-20 relative">
    <div class="w-full md:w-1/2 lg:w-1/2">
      <div class="profile bg-[rgba(0,0,0,.1)] dark:bg-[rgba(255,255,255,.1)]">
        <div class="title">
          <h1 class="text-3xl font-bold mb-2">xxyu's</h1>
          <h1 class="text-2xl font-bold">小窝</h1>
        </div>
        <div class="info">
          <div class="avatar">
            <Avatar size="base">
              <AvatarImage :src="AuthAvatar" alt="作者社交头像" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div class="ml-3 flex flex-col justify-around">
            <div class="name">xxyu</div>
            <div class="desc text-muted-foreground">一个前端开发者</div>
          </div>
        </div>
        <div>
          <ul>
            <li class="flex text-2xl mb-3 text-primary">
              <span class="hi">Hi! Nice to meet you! </span>
              <div class="hand ml-3">👋</div>
            </li>
            <li class="flex items-center gap-2 mb-2">
              <IconEmail class="text-2xl" />
              <span class="text-muted-foreground">{{ baseInfo.email }}</span>
            </li>
            <li class="flex items-center gap-2">
              <IconGithubVue class="text-2xl" /><NuxtLink
                target="_blank"
                :to="baseInfo.githubLink"
                class="text-muted-foreground hover:underline"
                >{{ baseInfo.githubLink }}</NuxtLink
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div
      class="w-full md:w-1/2 lg:w-1/2 h-[400px] flex items-center justify-center"
    >
      <TagCloud :tags="tags" />
    </div>

    <div class="absolute ball">
      <div class="item"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const baseInfo = useBaseInfo();

import IconVscode from "@/assets/svg/icon-vscode.svg";
import IconGit from "@/assets/svg/icon-git.svg";
import IconHtml from "@/assets/svg/icon-html.svg";
import IconCss from "@/assets/svg/icon-css.svg";
import IconScss from "@/assets/svg/icon-scss.svg";
import IconJs from "@/assets/svg/icon-js.svg";
import IconGithub from "@/assets/svg/icon-github.svg";
import IconReact from "@/assets/svg/icon-react.svg";
import IconNode from "@/assets/svg/icon-node.svg";
import IconExpress from "@/assets/svg/icon-express.svg";
import IconVue from "@/assets/svg/icon-vue.svg";
import IconNpm from "@/assets/svg/icon-npm.svg";
import IconNuxt from "@/assets/svg/icon-nuxt.svg";
import IconNginx from "@/assets/svg/icon-nginx.svg";
import IconPm2 from "@/assets/svg/icon-pm2.svg";
import IconTailwind from "@/assets/svg/icon-tailwind.svg";

import IconEmail from "@/components/svg/icon-email.vue";
import IconGithubVue from "@/components/svg/icon-github.vue";

import AuthAvatar from "@/assets/image/avatar.jpg";

const tags = [
  IconVscode,
  IconGit,
  IconHtml,
  IconCss,
  IconScss,
  IconJs,
  IconNode,
  IconExpress,
  IconVue,
  IconReact,
  IconGithub,
  IconNuxt,
  IconNpm,
  IconNginx,
  IconPm2,
  IconTailwind,
];

import renderSeo from "@/utils/renderSeo";

const _pageInfo = {
  title: baseInfo.title,
  description: baseInfo.description,
  image: "https://xxyu.online/og-image/index-og-image.png",
};
renderSeo(_pageInfo)
</script>

<style lang="scss" scoped>
.profile {
  height: 400px;
  border-radius: 40px;
  backdrop-filter: blur(8px);
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .info {
    display: flex;
  }
}

.hi {
  -webkit-text-fill-color: transparent;
  background: linear-gradient(
        45deg,
        transparent 35%,
        rgba(#fff, 0.6),
        transparent 65%
      )
      no-repeat,
    currentColor;
  background-size: 50%;
  -webkit-background-clip: text;
  background-clip: text;
  animation: light 3s infinite;
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
.hand {
  animation: jitter 2s infinite;
}

@keyframes jitter {
  0% {
    transform: scale(1) rotate(0deg);
  }
  20% {
    transform: scale(1.2) rotate(0deg);
  }
  40% {
    transform: scale(1.3) rotate(10deg);
  }
  60% {
    transform: scale(1.3) rotate(-10deg);
  }
  80% {
    transform: scale(1.3) rotate(10deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}
</style>
