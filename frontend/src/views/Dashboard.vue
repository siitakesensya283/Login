<template>
  <div class="content">
    <main class="dashboard-content">
      <p v-if="userName">ようこそ、{{ userName }}さん！</p>
      <p v-else>ユーザー名が見つかりません。</p>
      <section class="user-section">
        <div>
          <select @change="disFormat" class="dashboard-select">
            <option selected disabled>時間を選択してください</option>
            <option v-for="(item, index) in formattedTimeline" :key="index" :value="index">
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
      selectedSession: null,
    };
  },
  computed: {
    ...mapGetters(["userName", "timeline"]),
    formattedTimeline() {
      return this.timeline.map(timestamp => {
        return timestamp.substring(0, 16);
      });
    }
  },
  methods: {
    ...mapMutations(["setSessionTimeline","setSessionVehiclespped"]),
    disFormat(event) {
      this.selectedIndex = parseInt(event.target.value, 10);
      if (this.selectedIndex >= 0) {
        this.event();
      }
    },
    async event() {
      try {
        if (this.selectedIndex !== null) {
          const selectedSession = this.timeline[this.selectedIndex];
          //
          console.log(selectedSession);
          //
          const response = await axios.post(
            'https://2024isc1231028.weblike.jp/login/backend/event.php',
            {
              selectedSession,
            }
          );
          if (response.data.success) {
            this.$router.push("/result");
            this.setSessionTimeline(response.data.sessionTimeline);
            this.setSessionVehiclespped(response.data.sessionVehiclespeed);
            //
            console.log(response.data.sessionTimeline);
            console.log(response.data.sessionVehiclespeed);
            //
          } else {
            this.error = response.data.message;
          }
        }
      } catch (error) {
        this.error = "エラーが発生しました。";
      }
    },
  },
};
</script>
