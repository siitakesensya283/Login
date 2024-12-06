<template>
    <div class="content">
        <p v-if="userId">ようこそ、{{ userId }}さん！</p>
        <form @submit.prevent="register">
            <div>
                <label for="name">氏名</label>
                <input type="text" v-model="name" />
                <button type="submit">登録</button>
            </div>
            <div>
                <span v-if="nameError" style="color: red;">{{ nameError }}</span>
            </div>
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
        };
    },
    computed: {
        ...mapGetters(["userId"]),
    },
    methods: {
        ...mapMutations(["setUserName","setStartline"]),
        async register() {
            if (!this.checkSpace(this.userName)) {
                this.nameError = "姓名の間にスペースは入れないでください。";
                return;
            }
            if (!this.validateName(this.userName)) {
                this.nameError = "記号は使用できません。";
                return;
            }
            this.nameError = "";
            try {
                const response = await axios.post(
                    "https://2024isc1231028.weblike.jp/login/backend/register.php",
                    {
                        userId:this.userId,
                        name: this.name,
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
                    console.log(response.data.startline);
                    this.$router.push("/dashboard");
                } else {
                    this.error = response.data.message;
                }
            } catch (error) {
                this.error = "エラーが発生しました。2";
            }
        },
        checkSpace(name) {
            const spaceRegex = /\s/;
            return !spaceRegex.test(name);
        },
        validateName(name) {
            const invalidNameRegex = /[^a-zA-Zぁ-んァ-ン一-龯ー々〆〤]/;
            return !invalidNameRegex.test(name);
        },
    },
};
</script>
