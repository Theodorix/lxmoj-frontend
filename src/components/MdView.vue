<template>
  <Viewer :value="props.value" :plugins="plugins" />
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import { Viewer } from "@bytemd/vue-next";
import highlight from "@bytemd/plugin-highlight";
import { withDefaults, defineProps } from "vue";

const plugins = [
  highlight(),
  gfm(),
  // Add more plugins here
];

interface Props {
  value: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
});
</script>

<style>
.markdown-body p {
  font-size: 18px;
  margin: 10px 0;
}
.markdown-body pre {
  font-size: 16px;
  margin: 10px 0;
}
.markdown-body pre code.hljs {
  font-size: 16px;
  border-radius: 8px;
}
.arco-typography blockquote {
  padding-left: 12px !important;
}
div .arco-typography h5.arco-typography {
  font-size: 24px;
}
div .arco-typography h4.arco-typography {
  font-size: 28px;
}
</style>
