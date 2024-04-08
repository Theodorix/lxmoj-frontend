<!--<template>-->
<!--  <div id="searchView">-->
<!--    <div-->
<!--      style="position: fixed; bottom: 150px; right: 150px"-->
<!--      v-show="shouldShowGoTopButton"-->
<!--    >-->
<!--      <a-button-->
<!--        type="primary"-->
<!--        @click="goTop"-->
<!--        style="border-radius: 50%; box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2)"-->
<!--      >-->
<!--        <template #icon>-->
<!--          <icon-to-top />-->
<!--        </template>-->
<!--      </a-button>-->
<!--    </div>-->
<!--    <a-trigger trigger="click" :popup-translate="[0, 5]">-->
<!--      <a-input-search-->
<!--        v-model:model-value="searchParams.searchText"-->
<!--        class="centered"-->
<!--        :style="{-->
<!--          width: '480px',-->
<!--          marginBottom: '50px',-->
<!--          marginTop: '20px',-->
<!--        }"-->
<!--        placeholder="请输入搜索内容"-->
<!--        search-button-->
<!--        @search="onSearch"-->
<!--        @input="onSearch"-->
<!--        size="large"-->
<!--      />-->
<!--      <template #content>-->
<!--        <div class="div-content">-->
<!--          <div-->
<!--            style="-->
<!--              display: flex;-->
<!--              align-items: center;-->
<!--              justify-content: space-between;-->
<!--              height: 40px;-->
<!--            "-->
<!--          >-->
<!--            <span style="color: #8a8a8e; margin-left: 10px">历史记录</span>-->
<!--            <a-button-->
<!--              type="text"-->
<!--              size="mini"-->
<!--              style="border-radius: 5px; margin-right: 10px"-->
<!--              @click="emptySearchText"-->
<!--            >-->
<!--              <template #icon>-->
<!--                <icon-delete :size="20" style="color: #bfbfbf" />-->
<!--              </template>-->
<!--            </a-button>-->
<!--          </div>-->
<!--          <div-->
<!--            class="div-history"-->
<!--            v-for="(item, index) in searchHistory"-->
<!--            :key="index"-->
<!--          >-->
<!--            <div-->
<!--              @click="syncSearch(item)"-->
<!--              style="-->
<!--                display: flex;-->
<!--                align-items: center;-->
<!--                height: 40px;-->
<!--                margin-left: 10px;-->
<!--              "-->
<!--            >-->
<!--              <a-button size="mini" style="border-radius: 50%">-->
<!--                <template #icon>-->
<!--                  <icon-clock-circle :size="20" style="color: #bfbfbf" />-->
<!--                </template>-->
<!--              </a-button>-->
<!--              <span style="color: #8a8a8e; margin-left: 10px">{{ item }}</span>-->
<!--            </div>-->
<!--            <a-button-->
<!--              type="text"-->
<!--              size="mini"-->
<!--              style="border-radius: 50%; margin-right: 10px"-->
<!--              @click="closSearchText(item)"-->
<!--            >-->
<!--              <template #icon>-->
<!--                <icon-close :size="20" style="color: #bfbfbf" />-->
<!--              </template>-->
<!--            </a-button>-->
<!--          </div>-->
<!--        </div>-->
<!--      </template>-->
<!--    </a-trigger>-->
<!--    <a-tabs-->
<!--      v-model:activeKey="activeKey"-->
<!--      @change="onTabChange"-->
<!--      size="large"-->
<!--      style="margin: 0 auto; width: 70%"-->
<!--      class="centered-tabs"-->
<!--    >-->
<!--      <a-tab-pane key="question">-->
<!--        <template #title>-->
<!--          <icon-calendar />-->
<!--          题目-->
<!--          <a-tag color="gray" style="border-radius: 10px">-->
<!--            <span style="color: #61666d">{{-->
<!--              questionTotal > 99 ? "99+" : questionTotal-->
<!--            }}</span>-->
<!--          </a-tag>-->
<!--        </template>-->
<!--        <QuestionPage-->
<!--          :question-list="questionList"-->
<!--          :question-total="questionTotal"-->
<!--        />-->
<!--      </a-tab-pane>-->
<!--      <a-tab-pane key="post">-->
<!--        <template #title>-->
<!--          <icon-bookmark />-->
<!--          帖子-->
<!--          <a-tag color="gray" style="border-radius: 50%">-->
<!--            <span style="color: #61666d">{{-->
<!--              postTotal > 99 ? "99+" : postTotal-->
<!--            }}</span>-->
<!--          </a-tag>-->
<!--        </template>-->
<!--        <PostPage :post-list="postList" :post-total="postTotal" />-->
<!--      </a-tab-pane>-->
<!--      <a-tab-pane key="user">-->
<!--        <template #title>-->
<!--          <icon-user />-->
<!--          用户-->
<!--          <a-tag color="gray" style="border-radius: 50%">-->
<!--            <span style="color: #61666d">{{-->
<!--              userTotal > 99 ? "99+" : userTotal-->
<!--            }}</span>-->
<!--          </a-tag>-->
<!--        </template>-->
<!--        <UserPage :user-list="userList" :user-total="userTotal" />-->
<!--      </a-tab-pane>-->
<!--      <a-tab-pane key="picture">-->
<!--        <template #title>-->
<!--          <icon-image />-->
<!--          图片-->
<!--          <a-tag v-if="isShow" color="gray" style="border-radius: 10px">-->
<!--            <span style="color: #61666d">99+</span>-->
<!--          </a-tag>-->
<!--          <a-tag v-else color="gray" style="border-radius: 10px">-->
<!--            <span style="color: #61666d">0</span>-->
<!--          </a-tag>-->
<!--        </template>-->
<!--        <PicturePage :picture-list="pictureList" />-->
<!--      </a-tab-pane>-->
<!--    </a-tabs>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import { onMounted, onUnmounted, ref, watchEffect } from "vue";-->
<!--import QuestionPage from "@/components/QuestionPage.vue";-->
<!--import PostPage from "@/components/PostPage.vue";-->
<!--import UserPage from "@/components/UserPage.vue";-->
<!--import { useRoute, useRouter } from "vue-router";-->
<!--import PicturePage from "@/components/PicturePage.vue";-->
<!--import {-->
<!--  SearchAllQueryRequest,-->
<!--  SearchControllerService,-->
<!--} from "../../../generated";-->
<!--import message from "@arco-design/web-vue/es/message";-->
<!--import _ from "lodash";-->

<!--//拿去当前页面信息使用次函数-->
<!--const route = useRoute();-->
<!--const router = useRouter();-->

<!--const isShow = ref(false);-->
<!--const shouldShowGoTopButton = ref(false);-->

<!--const activeKey = route.params.category;-->

<!--const searchText = ref(route.params.searchText || undefined);-->

<!--// 历史记录-->
<!--const searchHistory = ref([]);-->

<!--const searchParams = ref<SearchAllQueryRequest>({-->
<!--  type: undefined,-->
<!--  searchText: searchText.value as string,-->
<!--  pageSize: 20,-->
<!--  current: 1,-->
<!--});-->
<!--const questionList = ref([]);-->
<!--const questionTotal = ref(0);-->
<!--const postList = ref([]);-->
<!--const postTotal = ref(0);-->
<!--const pictureList = ref([]);-->
<!--const pictureTotal = ref(0);-->
<!--const userList = ref([]);-->
<!--const userTotal = ref(0);-->

<!--const loading = ref(false);-->
<!--const loadData = async () => {-->
<!--  const res = await SearchControllerService.searchAllVoListUsingPost(-->
<!--    searchParams.value-->
<!--  );-->
<!--  isShow.value = false;-->
<!--  if (res.code === 0) {-->
<!--    isShow.value = true;-->
<!--    // 题目数据-->
<!--    if (res.data.questionVOList) {-->
<!--      // 去重-->
<!--      const newQuestionList = [-->
<!--        ...questionList.value,-->
<!--        ...res.data.questionVOList.records,-->
<!--      ];-->
<!--      const uniqueQuestionList = Array.from(-->
<!--        new Map(newQuestionList.map((item) => [item.id, item])).values()-->
<!--      );-->
<!--      questionList.value = uniqueQuestionList as any;-->

<!--      questionTotal.value = res.data.questionVOList.total;-->
<!--    }-->

<!--    // 帖子数据-->
<!--    if (res.data.postVOList) {-->
<!--      // 去重-->
<!--      const newPostList = [...postList.value, ...res.data.postVOList.records];-->
<!--      const uniquePostList = Array.from(-->
<!--        new Map(newPostList.map((item) => [item.id, item])).values()-->
<!--      );-->
<!--      postList.value = uniquePostList as any;-->

<!--      postTotal.value = res.data.postVOList.total;-->
<!--    }-->

<!--    // 用户数据-->
<!--    if (res.data.userVOList) {-->
<!--      // 去重-->
<!--      const newUserList = [...userList.value, ...res.data.userVOList.records];-->
<!--      const uniqueUserList = Array.from(-->
<!--        new Map(newUserList.map((item) => [item.id, item])).values()-->
<!--      );-->
<!--      userList.value = uniqueUserList as any;-->

<!--      userTotal.value = res.data.userVOList.total;-->
<!--    }-->

<!--    // 图片数据-->
<!--    if (res.data.pictureList) {-->
<!--      pictureList.value = [-->
<!--        ...pictureList.value,-->
<!--        ...res.data.pictureList.records,-->
<!--      ] as any;-->

<!--      pictureTotal.value = res.data.pictureList.total;-->
<!--    }-->

<!--    loading.value = false;-->
<!--  } else {-->
<!--    loading.value = false;-->
<!--    message.error("加载失败：" + res.message);-->
<!--  }-->
<!--};-->

<!--// 采用节流-->
<!--const handleScroll = _.throttle(() => {-->
<!--  const scrollY = window.scrollY;-->
<!--  if (scrollY > 1000) {-->
<!--    // 控制返回头部显示-->
<!--    shouldShowGoTopButton.value = true;-->
<!--  } else {-->
<!--    shouldShowGoTopButton.value = false;-->
<!--  }-->
<!--  const windowHeight = window.innerHeight;-->
<!--  const documentHeight = document.documentElement.scrollHeight;-->
<!--  if (scrollY + windowHeight >= documentHeight * 0.9 && !loading.value) {-->
<!--    loading.value = true;-->
<!--    searchParams.value = {-->
<!--      ...searchParams.value,-->
<!--      current: (searchParams.value.current as any) + 1,-->
<!--      type: route.params.category as string,-->
<!--    };-->
<!--  }-->
<!--}, 300); // 设置节流时间间隔，单位为毫秒-->

<!--onMounted(() => {-->
<!--  window.addEventListener("scroll", handleScroll);-->
<!--  // 从 sessionStorage 中读取搜索词数组-->
<!--});-->

<!--onUnmounted(() => {-->
<!--  window.removeEventListener("scroll", handleScroll);-->
<!--});-->

<!--watchEffect(() => {-->
<!--  searchParams.value = {-->
<!--    ...searchParams.value,-->
<!--    searchText: route.query.searchText,-->
<!--  } as any;-->
<!--  loadData();-->
<!--  // 历史记录-->
<!--  const storedSearchTexts = sessionStorage.getItem("searchTexts");-->
<!--  if (storedSearchTexts) {-->
<!--    // 解析 JSON 字符串，并反转数组-->
<!--    searchHistory.value = JSON.parse(storedSearchTexts).reverse();-->
<!--  } else {-->
<!--    // 如果没有存储的搜索词，初始化为空数组-->
<!--    searchHistory.value = [];-->
<!--  }-->
<!--});-->

<!--//  采用防抖-->
<!--const debouncedOnSearch = _.debounce((value: string) => {-->
<!--  if (searchParams.value.current !== 1) {-->
<!--    searchParams.value.current = 1;-->
<!--    searchParams.value.type = undefined;-->
<!--  }-->

<!--  if (value) {-->
<!--    router.push({-->
<!--      query: {-->
<!--        searchText: searchParams.value.searchText,-->
<!--      },-->
<!--    });-->
<!--  } else {-->
<!--    router.push({-->
<!--      query: { searchText: undefined },-->
<!--    });-->
<!--  }-->
<!--}, 300); // 设置防抖时间间隔，单位为毫秒-->

<!--// 将搜索框上的内容同步到url上-->
<!--const onSearch = (value: string) => {-->
<!--  questionList.value = [];-->
<!--  postList.value = [];-->
<!--  userList.value = [];-->
<!--  pictureList.value = [];-->
<!--  debouncedOnSearch(value);-->

<!--  // 检查搜索词是否为空或只包含空白字符-->
<!--  if (!value.trim()) {-->
<!--    return; // 如果是空的，直接返回不进行存储-->
<!--  }-->

<!--  // 从 sessionStorage 中读取已存储的搜索词数组-->
<!--  const storedSearchTexts = sessionStorage.getItem("searchTexts");-->
<!--  let searchTexts = storedSearchTexts ? JSON.parse(storedSearchTexts) : [];-->

<!--  // 检查当前搜索词是否已存在于数组中，如果存在则先移除-->
<!--  const index = searchTexts.indexOf(value);-->
<!--  if (index !== -1) {-->
<!--    searchTexts.splice(index, 1);-->
<!--  }-->

<!--  // 如果数组已满（10个元素），则移除第一个元素-->
<!--  if (searchTexts.length >= 10) {-->
<!--    searchTexts.shift();-->
<!--  }-->

<!--  // 添加新的搜索词到数组末尾-->
<!--  searchTexts.push(value);-->

<!--  // 将更新后的搜索词数组存储到 sessionStorage 中-->
<!--  sessionStorage.setItem("searchTexts", JSON.stringify(searchTexts));-->
<!--};-->
<!--const onTabChange = (key: string) => {-->
<!--  searchParams.value = {-->
<!--    ...searchParams.value,-->
<!--    current: 1,-->
<!--    type: undefined,-->
<!--  };-->
<!--  router.push({-->
<!--    path: `/search/${key}`,-->
<!--    query: {-->
<!--      searchText: searchParams.value.searchText,-->
<!--    },-->
<!--  });-->
<!--};-->

<!--const goTop = () => {-->
<!--  window.scrollTo({-->
<!--    top: 0,-->
<!--    behavior: "smooth",-->
<!--  });-->
<!--};-->

<!--const syncSearch = (item: string) => {-->
<!--  questionList.value = [];-->
<!--  postList.value = [];-->
<!--  userList.value = [];-->
<!--  pictureList.value = [];-->
<!--  router.push({-->
<!--    query: {-->
<!--      searchText: item,-->
<!--    },-->
<!--  });-->
<!--  searchParams.value = {-->
<!--    ...searchParams.value,-->
<!--    current: 1,-->
<!--    type: undefined,-->
<!--  };-->
<!--};-->

<!--const closSearchText = (searchWord: string) => {-->
<!--  // 从 sessionStorage 中读取已存储的搜索词数组-->
<!--  const storedSearchTexts = sessionStorage.getItem("searchTexts");-->
<!--  if (storedSearchTexts) {-->
<!--    let searchTexts = JSON.parse(storedSearchTexts);-->

<!--    // 查找指定搜索词的索引-->
<!--    const index = searchTexts.indexOf(searchWord);-->

<!--    // 如果找到，根据索引删除数组中的元素-->
<!--    if (index !== -1) {-->
<!--      searchTexts.splice(index, 1);-->

<!--      // 将更新后的搜索词数组存储到 sessionStorage 中-->
<!--      sessionStorage.setItem("searchTexts", JSON.stringify(searchTexts));-->

<!--      // 更新 searchHistory 数组以反映删除操作-->
<!--      searchHistory.value = searchTexts.reverse();-->
<!--    }-->
<!--  }-->
<!--};-->

<!--const emptySearchText = () => {-->
<!--  // 删除sessionStorage中的searchTexts-->
<!--  sessionStorage.removeItem("searchTexts");-->
<!--  searchHistory.value = [];-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--#searchView {-->
<!--  text-align: center;-->
<!--  margin: 0 auto;-->
<!--  background-color: #f7f8fa;-->
<!--  padding-top: 20px;-->
<!--  position: relative;-->
<!--}-->

<!--.centered {-->
<!--  margin: 0 auto;-->
<!--}-->

<!--.centered-tabs {-->
<!--  text-align: center;-->
<!--}-->

<!--.div-content {-->
<!--  background-color: #ffffff;-->
<!--  border-radius: 10px;-->
<!--  width: 470px;-->
<!--  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);-->
<!--  padding: 8px;-->
<!--}-->

<!--.div-history {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  justify-content: space-between;-->
<!--  border-radius: 10px;-->
<!--  cursor: pointer;-->
<!--}-->

<!--.div-history:hover {-->
<!--  background-color: #f7f7f8;-->
<!--}-->
<!--</style>-->
