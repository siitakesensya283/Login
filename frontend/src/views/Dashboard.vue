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
import { mapGetters, mapMutations } from 'vuex';
import '@/assets/style.css';
import { map } from 'core-js/core/array';

export default {
  data(){
    selectedIndex=null;
    timeId=null;
    nextId=null;
  },
  computed: {
    ...mapGetters(['userName']), // Vuexのゲッターを使用してユーザー名を取得
    ...mapGetters(['timeline']),//多分この辺で終わってる...多分新しいページも作る...store足さなきゃかも
    ...mapGetters(['timeId']),
  },
  methods: {
    ...mapMutations(["setUserName"]),
    ...mapMutations(["setTimeId"]),
    ...mapMutations(["setNextId"]),

    async event(event) {

      this.selectedIndex = event.target.value;
      this.timeId=timeId[selectedIndex];
      this.nextId=timeId[selectedIndex+1];
      try {
        const response = await axios.post(
          "https://2024isc1231028.weblike.jp/login/backend/event.php",
          {
            userId: this.userId,
            timeId: this.timeId,
            nextId: this.nextid,
          }
        );

        this.$router.push("/"); // ダッシュボードへリダイレクト
          this.setUserId(response.data.userId); // ユーザー名をVuexストアに保存
          this.setTimeId(response.data.timeId);
          this.setTimeId(response.data.timeId);

        /*if (response.data.success) {
          // ログイン成功
          this.$router.push("/dashboard"); // ダッシュボードへリダイレクト
          this.setUserName(response.data.name); // ユーザー名をVuexストアに保存
          this.setTimeline(response.data.timeline);
          this.setTimeId(response.data.timeId);
        } else {
          // ログイン失敗
          this.error = response.data.message;
        }
          */
      } catch (error) {
        this.error = "エラーが発生しました。";
      }
    },
  },
}
</script>