<template>
  <div class="content">
    <main class="dashboard-content">
      <p v-if="userName">ようこそ、{{ userName }}さん！</p>
      <p v-else>ユーザー名が見つかりません。</p>

      <section class="timeline">
        <h2>タイムライン</h2>
        <div class="timeline-line">
          <div
            v-for="event in timelineData"
            :key="event.id"
            class="timeline-event"
            :style="{ left: getPosition(event.created_at) }"
            @mouseover="showTooltip(event.text)"
            @mouseleave="hideTooltip"
          >
            <div class="icon"></div>
            <span class="tooltip" v-if="activeTooltip === event.text">{{ activeTooltip }}</span>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  data() {
    return {
      timelineData: [],
      activeTooltip: '',
    };
  },
  computed: {
    ...mapGetters(['userName', 'userId']), // Vuexのゲッターを使用してユーザー名とユーザーIDを取得
  },
  methods: {
    async fetchTimeline() {
      try {
        const response = await axios.get(`https://2024isc1231028.weblike.jp/login/backend/index.php?userId=${this.userId}`);
        this.timelineData = response.data;
      } catch (error) {
        console.error('タイムラインの取得に失敗しました:', error);
      }
    },
    getPosition(timestamp) {
      // タイムスタンプを使ってアイコンの位置を計算するロジックを実装
      const date = new Date(timestamp);
      return `${date.getHours() * 20}px`; // 例として、1時間ごとに20px移動
    },
    showTooltip(text) {
      this.activeTooltip = text;
    },
    hideTooltip() {
      this.activeTooltip = '';
    },
  },
  mounted() {
    this.fetchTimeline(); // コンポーネントがマウントされたときにタイムラインを取得
  },
};
</script>

<style scoped>
.timeline {
  position: relative;
  width: 100%;
}
.timeline-line {
  position: relative;
  height: 2px;
  background-color: #ccc;
}
.timeline-event {
  position: absolute;
  bottom: 0;
}
.icon {
  width: 10px;
  height: 10px;
  background-color: blue; /* アイコンの色 */
  border-radius: 50%;
}
.tooltip {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  padding: 5px;
  display: inline-block;
  z-index: 1;
}
</style>
