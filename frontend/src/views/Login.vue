<template>
    <div class="content">
        <form @submit.prevent="getStartline">
            <div>
                <label for="userId">ユーザID</label>
                <input type="text" v-model="userId" maxlength="8" required />
            </div>
            <div>
                <label for="password">パスワード</label>
                <input type="password" v-model="password" required />
            </div>
            <button type="submit">ログイン</button>
        </form>
        <p v-if="error">{{ error }}</p>
    </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
import '@/assets/style.css';

export default {
    data() {
        return {
            userId: "",
            password: "",
            error: "",
        };
    },
    methods: {
        ...mapMutations(["setUserId","setUserName", "setStartline"]),

        async login() {
            try {
                const response = await axios.post(
                    "https://2024isc1231028.weblike.jp/login/backend/index.php",
                    {
                        userId: this.userId,
                        password: this.password,
                    }
                );
                if (response.data.success) {
                    this.setUserId(this.userId);
                    this.setUserName(response.data.name);
                } else {
                    this.error = response.data.message;
                }
            } catch (error) {
                this.error = "エラーが発生しました。";
            }
        },

        async getStartline() {
            await this.login();
            try {
                const response = await axios.post(
                    "https://2024isc1231028.weblike.jp/login/backend/startline.php",
                    {
                        userId: this.userId,
                    }
                );
                if (response.data.success) {
                    this.setStartline(response.data.startline);
                    this.$router.push("/dashboard");
                } else {
                    this.error = response.data.message;
                }
            } catch (error) {
                this.error = "エラーが発生しました。";
            }
        },
    },
};
</script>
