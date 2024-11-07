<template>
  <div class="content">
    <main class="dashboard-content">
      <p v-if="userName">ようこそ、{{ userName }}さん！</p>
      <p v-else>ユーザー名が見つかりません。</p>

      <section class="user-section">
        <h2>最近のアクティビティ</h2>
        <p>ここに最新の活動情報が表示されます。</p>
        <p v-if="timeline">{{ timeline }}</p>
        <p v-else>タイムラインが見つかりません</p>

        <div>
          <select @change="event">
            <option v-for="(item, index) in items" :key="index" :value="index">
              {{ item }}
            </option>
          </select>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import "@/assets/style.css";
import axios from "axios";

export default {
  data() {
    return {
      selectedIndex: null,
      items: ["アクティビティ1", "アクティビティ2", "アクティビティ3"], // 任意の例
      error: null, // エラーメッセージ用
    };
  },
  computed: {
    ...mapGetters(["userName", "timeline", "timeId"]),
  },
  methods: {
    ...mapMutations(["setUserName", "setTimeId", "setNextId"]),

    async event(event) {
      // セレクトボックスから選択されたインデックスを取得
      this.selectedIndex = event.target.value;
      this.timeId = this.timeId ? this.timeId[this.selectedIndex] : null;
      const nextId = this.timeId ? this.timeId[this.selectedIndex + 1] : null;

      try {
        const response = await axios.post(
          "https://2024isc1231028.weblike.jp/login/backend/event.php",
          {
            userId: this.userId,
            timeId: this.timeId,
            nextId: nextId,
          }
        );

        // リクエスト成功時の処理
        this.setUserName(response.data.name);
        this.setTimeId(response.data.timeId);
        this.$router.push("/dashboard"); // ダッシュボードへリダイレクト
      } catch (error) {
        this.error = "エラーが発生しました。"; // エラー発生時の処理
      }
    },
  },
};
</script>
