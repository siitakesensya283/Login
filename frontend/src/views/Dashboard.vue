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
      endTime: null,
      can: []
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
    ...mapMutations(["setGps", "setCanFlg", "setCan"]),

    async disFormat(event) {
      this.selectedIndex = parseInt(event.target.value, 10);
      if (this.selectedIndex >= 0) {
        await this.getCan();
        await this.getEndTime();
        await this.canFormat();
        await this.getGps();
      }
    },

    async getCan() {
      try {
        if (this.selectedIndex !== null) {
          this.selectedTime = this.startline[this.selectedIndex];
          const response = await axios.post(
            'https://2024isc1231028.weblike.jp/login/backend/can.php',
            {
              selectedTime: this.selectedTime,
            }
          );
          if (response.data.success) {
            this.can = response.data.can;
          } else {
            this.error = response.data.message;
          }
        }
      } catch (error) {
        this.error = "エラーが発生しました。";
      }
    },

    async getEndTime() {
      const lastIndex = this.can.length - 1;
      const endTime = this.can[lastIndex].time;
      this.endTime = endTime;
    },

    async canFormat() {
      const canFlg = this.can.map(({ id, ign, VehicleSpeed, ldw, time }) => {
        const sFlg = VehicleSpeed <= 25 ? 0 :
          VehicleSpeed <= 30 ? 1 : 2;
        const lFlg = ldw == 1 ? 1 : 0;
        return [id, ign, VehicleSpeed, ldw, time, sFlg, lFlg];
      });
      this.setCanFlg(canFlg);
    },

    async getGps() {
      try {
        const response = await axios.post(
          'https://2024isc1231028.weblike.jp/login/backend/gps.php',
          {
            startTime: this.selectedTime,
            endTime: this.endTime
          }
        );
        if (response.data.success) {
          this.setGps(response.data.gps);
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
