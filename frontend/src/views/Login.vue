<template>
    <div class="content">
        <form @submit.prevent="login">
            <!-- ユーザID入力欄 -->
            <div>
                <label for="userId">ユーザID(英数字8字)</label>
                <input
                    type="text"
                    v-model="userId"
                    maxlength="8"
                    required
                />
                <p v-if="userIdError" class="error">ユーザIDは英数字8文字である必要があります。</p>
            </div>

            <!-- パスワード入力欄 -->
            <div class="password-container">
                <label for="password">パスワード</label>
                <input
                    :type="passVis ? 'text' : 'password'"
                    v-model="password"
                    required
                />
                <img
                    :src="passVis ? require('@/assets/eye-off.png') : require('@/assets/eye.png')"
                    alt="表示切替"
                    class="password-toggle-icon"
                    @click="togglePassVis"
                />
            </div>

            <!-- ログインボタン -->
            <button type="submit" class="Login-botton">ログイン</button>
        </form>
        
        <!-- エラーメッセージ表示 -->
        <p v-if="error" class="error">{{ error }}</p>
    </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
import "@/assets/style.css";

export default {
    data() {
        return {
            userId: "",
            password: "",
            error: "",
            userIdError: false,
            passVis: false,
        };
    },
    methods: {
        ...mapMutations(["setUserId", "setUserName", "setStartline"]),

        // パスワード表示切り替え
        togglePassVis() {
            this.passVis = !this.passVis;
        },

        // ログイン処理
        async login() {
            this.userIdError = !/^[a-zA-Z0-9]{8}$/.test(this.userId);

            if (this.userIdError) {
                this.error = "入力内容を確認してください。";
                return;
            }

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
                    if (response.data.name === "") {
                        this.$router.push("/register");
                        return;
                    }
                    this.setUserName(response.data.name);

                    if (this.userId === "admin001") {
                        this.$router.push("/admin");
                        return;
                    }
                    await this.getStartline();
                } else {
                    this.error = response.data.message;
                }
            } catch (error) {
                this.error = "エラーが発生しました。";
            }
        },

        // スタートライン取得
        async getStartline() {
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