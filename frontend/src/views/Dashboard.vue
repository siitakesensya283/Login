<template>
  <div class="content">
    <main class="dashboard-content">
      <p v-if="userName">ようこそ、{{ userName }}さん！</p>
      <p v-else>ユーザー名が見つかりません。</p>

      <section class="user-section">
        <h2>最近のアクティビティ</h2>
        <p>ここに最新の活動情報が表示されます。</p>
      </section>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import '@/assets/style.css';

export default {
  computed: {
    ...mapGetters(['userName']) // Vuexのゲッターを使用してユーザー名を取得
  }
}
</script>