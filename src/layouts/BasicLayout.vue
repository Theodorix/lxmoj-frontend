<template>
  <div id="basic-layout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <span />
          <span style="font-size: 16px; text-align: center; flex-grow: 1">
            酷客 CucKer 编程代码学习系统
          </span>
          <a
            href="https://github.com/Theodorix/lxmoj-frontend"
            target="_blank"
            style="
              text-decoration: none;
              display: flex;
              align-items: center;
              margin-right: 30px;
            "
          >
            <icon-github
              style="color: #262626bf; font-size: 25px; margin-right: 7px"
            ></icon-github>
            <span style="color: #262626bf">GitHub</span>
          </a>
        </div>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#basic-layout {
}

#basic-layout .header {
  box-shadow: #eee 1px 1px 5px;
  z-index: 999;
}

#basic-layout .content {
}

#basic-layout .footer {
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  box-shadow: #eee 0 -2px 5px;
  line-height: 40px;
}
</style>

<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>
