<template>
    <div class="content">
        <p>氏名と新しいパスワードを設定して下さい。</p>
        <form @submit.prevent="register">
            <div>
                <label for="name">氏名</label>
                <input type="text" v-model="name" />
            </div>
            <div>
                <span v-if="nameError" style="color: red;">{{ nameError }}</span>
            </div>
            <div>
                <label for="password">新規パスワード</label>
                <input :type="passVis ? 'text' : 'password'" v-model="password" required />
                <button type="button" @click="togglePassVis">{{ passVis ? '非表示' : '表示' }}</button>
            </div>
            <div>
                <label for="confirmPassword">パスワード確認</label>
                <input :type="passVis ? 'text' : 'password'" v-model="confirmPassword" required />
                <span v-if="passwordError" style="color: red;">{{ passwordError }}</span>
            </div>
            <button type="submit">登録</button>
        </form>
        <p v-if="error">{{ error }}</p>
    </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapMutations } from "vuex";
import '@/assets/style.css';

export default {
    data() {
        return {
            name: "",
            error: "",
            nameError: "",
            password: "",
            confirmPassword: "",
            passwordError: "",
            passVis:false
        };
    },
    computed: {
        ...mapGetters(["userId"]),
    },
    methods: {
        ...mapMutations(["setUserName", "setStartline"]),
        async register() {

            if (!this.checkSpace(this.name)) {
                this.nameError = "姓名の間にスペースは入れないでください。";
                return;
            }
            if (!this.validateName(this.name)) {
                this.nameError = "記号は使用できません。";
                return;
            }
            this.nameError = "";

            if (this.password !== this.confirmPassword) {
                this.passwordError = "パスワードが一致しません。";
                return;
            } else {
                this.passwordError = "";
            }

            if (!this.validatePassword(this.password)) {
                this.passwordError = "パスワードは8文字以上、大文字、小文字、数字を含めてください。";
                return;
            } else {
                this.passwordError = "";
            }

            try {
                const response = await axios.post(
                    "https://2024isc1231028.weblike.jp/login/backend/register.php",
                    {
                        userId: this.userId,
                        name: this.name,
                        password: this.password
                    }
                );
                if (response.data.success) {
                    this.setUserName(this.name);
                    await this.getStartline();
                } else {
                    this.error = response.data.message;
                }
            } catch (error) {
                this.error = "エラーが発生しました。1";
            }
        },
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
                this.error = "エラーが発生しました。2";
            }
        },
        checkSpace(name) {//名前にスペースが含まれていないか
            const spaceRegex = /\s/;
            return !spaceRegex.test(name);
        },
        validateName(name) {//名前を確認する正規表現
            const invalidNameRegex = /[^a-zA-Zぁ-んァ-ン一-龯ー々〆〤]/;
            return !invalidNameRegex.test(name);
        },
        validatePassword(password) {
            // パスワードが8文字以上、大文字、小文字、数字を含むか確認する正規表現
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            return passwordRegex.test(password);
        },
        togglePassVis() {
            event.preventDefault()//submitを無効
            this.passVis = !this.passVis;
        },
    },
};
</script>
