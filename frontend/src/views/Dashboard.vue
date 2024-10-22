<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <h1>ダッシュボード</h1>
      <button @click="logout">ログアウト</button>
    </header>

    <main class="dashboard-content">
      <p v-if="userName">ようこそ、{{ userName }}さん！</p>
      <p v-else>ユーザー名が見つかりません。</p>

      <section class="user-section">
        <h2>最近のアクティビティ</h2>
        <p>ここに最新の活動情報が表示されます。</p>
      </section>
    </main>

    <footer class="dashboard-footer">
      <p>&copy; 2024 あなたのアプリケーション</p>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['userName']) // Vuexのゲッターを使用してユーザー名を取得
  },
  methods: {
    logout() {
      // ログアウト処理
      localStorage.removeItem('token');
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
/* ダッシュボード全体のデザイン */
.dashboard {
  font-family: 'Arial', sans-serif;
  background-color: #f0f4f8;
  color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* ヘッダー */
.dashboard-header {
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard-header h1 {
  margin: 0;
  font-size: 24px;
}

.dashboard-header button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}

/* コンテンツエリア */
.dashboard-content {
  padding: 40px;
  flex-grow: 1;
}

.user-section {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.user-section h2 {
  margin-bottom: 10px;
  font-size: 18px;
}

/* フッター */
.dashboard-footer {
  background-color: #2c3e50;
  color: white;
  text-align: center;
  padding: 10px;
}
</style>
