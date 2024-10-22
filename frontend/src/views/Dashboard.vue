<template>
  <div class="dashboard">
      <h1>ダッシュボード</h1>
      <p v-if="userName">ようこそ、{{ userName }}さん！</p>
      <p v-else>ユーザー名が見つかりません。</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
      ...mapGetters(['userName']) // Vuexのゲッターを使用してユーザー名を取得
  }
};
</script>

<style scoped>
/* スタイルをここに追加 */
</style>
