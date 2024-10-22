<script setup>
import { RouterView,useRoute,useRouter } from 'vue-router'
import { computed } from 'vue';
import '@/assets/style.css'

const route = useRoute();
const router =useRouter();

const pageTitle = computed(() => {
  switch (route.name) {
    case 'Dashboard':
      return 'ダッシュボード';
    case 'Login':
      return 'ログイン';
    default:
      return 'エラー';
  }
});

const logout = () => {    // ログアウト処理
  localStorage.removeItem('token');
  router.push('/');
};
</script>

<template>
  <div class="common">
    <header class="header">
      <h1>{{ pageTitle }}</h1>
      <button @click="logout" v-if="route.name != 'Login'">ログアウト</button>
    </header>
    <div id="app">
      <router-view />
    </div>
    <footer class="footer">
      <p>&copy; 2024 あなたのアプリケーション</p>
    </footer>
  </div>
  <img src="https://key.visualarts.gr.jp/diary/entrypict/20190123_keyblog_01.jpg" class="img">
</template>