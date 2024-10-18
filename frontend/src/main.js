import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router'
import store from './store'; // 追加したストアをインポート

const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.use(router);
app.use(store); // ストアをアプリに登録
app.mount('#app');