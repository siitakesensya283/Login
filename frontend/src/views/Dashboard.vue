<template>
  <div class="content">
    <main class="dashboard-content">
      <p v-if="userName">ようこそ、{{ userName }}さん！</p>
      <p v-else>ユーザー名が見つかりません。</p>
      <section class="user-section">
        <div>
          <select @change="disFormat" class="dashboard-select">
            <option selected disabled>時間を選択してください</option>
            <option v-for="(item, index) in formattedStartline" :key="index" :value="index">
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
      selectedTime: null,
    };
  },
  computed: {
    ...mapGetters(["userName", "startline"]),
    formattedStartline() {
      return this.startline.map(timestamp => {
        return timestamp.substring(0, 16);
      });
    }
  },
  methods: {
    ...mapMutations(["setGps", "setCanTimeline", "setCanSpeed"]),
    async disFormat(event) {
      this.selectedIndex = parseInt(event.target.value, 10);
      if (this.selectedIndex >= 0) {
        await this.getGps();
      }
    },
    async getCan() {
      try {
        if (this.selectedIndex !== null) {
          const selectedTime = this.startline[this.selectedIndex];
          console.log(selectedTime);///
          const response = await axios.post(
            'https://2024isc1231028.weblike.jp/login/backend/can.php',
            {
              selectedTime,
            }
          );
          if (response.data.success) {
            this.setCanTimeline(response.data.canTimeline);
            this.setCanSpeed(response.data.canSpeed);
          } else {
            this.error = response.data.message;
          }
        }
      } catch (error) {
        this.error = "エラーが発生しました。";
      }
    },

    async getGps() {
      await this.getCan();
      try {
        const response = await axios.post(
          'https://2024isc1231028.weblike.jp/login/backend/gps.php',
          {

          }
        );
        if (response.data.success) {
          this.setGps(response.data.gps);
          console.log(response.data.gps);///
          this.$router.push("/result");
        } else {
          this.error = response.data.message;
        }
      } catch (error) {
        this.error = "エラーが発生しました。"
      }
    }
  },
};
</script>
