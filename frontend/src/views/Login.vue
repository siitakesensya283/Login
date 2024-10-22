<template>
    <div class="login">
        <header class="login-header">
            <h1>ログイン</h1>
        </header>
        <form @submit.prevent="login">
            <div>
                <label for="userId">ユーザID (8桁の英数字)</label>
                <input type="text" v-model="userId" maxlength="8" required />
            </div>
            <div>
                <label for="password">パスワード</label>
                <input type="password" v-model="password" required />
            </div>
            <button type="submit">ログイン</button>
        </form>
        <p v-if="error">{{ error }}</p>
        <footer class="login-footer">
            <p>&copy; 2024 あなたのアプリケーション</p>
        </footer>
    </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";

export default {
    data() {
        return {
            userId: "",
            password: "",
            error: "",
        };
    },
    methods: {
        ...mapMutations(["setUserName"]),

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
                    // ログイン成功
                    this.$router.push("/dashboard"); // ダッシュボードへリダイレクト
                    this.setUserName(response.data.name); // ユーザー名をVuexストアに保存
                } else {
                    // ログイン失敗
                    this.error = response.data.message;
                }
            } catch (error) {
                this.error = "エラーが発生しました。";
            }
        },
    },
};
</script>

<style scoped>
.login {
    font-family: 'Arial', sans-serif;
    background-color: #f0f4f8;
    color: #333;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.login-header {
    background-color: #2c3e50;
    color: white;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.login-header h1 {
    margin: 0;
    font-size: 24px;
}

form {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    /* 必要に応じて幅を設定 */
    max-width: 400px;
    margin-top: 20px;
}

/* フッター */
.login-footer {
    background-color: #2c3e50;
    color: white;
    text-align: center;
    padding: 10px;
}
</style>
