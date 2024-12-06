<template>
    <div class="content">
        <form @submit.prevent="search">
            <button class="commonButton">検索</button>
            <p v-if="error" class="unassigned-error-message">{{ error }}</p>
            <ul v-if="unassignedId.length > 0" class="unassigned-list">
                <li v-for="(id, index) in unassignedId" :key="index" class="unassigned-item">
                    {{ id }}
                </li>
            </ul>
            <p v-else-if="!error">表示する未割り当てIDがありません。</p>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            unassignedId: [],
            error: null,
        };
    },
    methods: {
        async search() {//未割り当てのアカウントIDを検索
            this.error = null;//エラー文をリセット
            try {
                const response = await axios.post(
                    "https://2024isc1231028.weblike.jp/login/backend/unassigned.php"
                );
                if (response.data.success) {
                    this.unassignedId = response.data.unassignedId;
                } else {
                    this.unassignedId = [];
                    this.error = "データが取得できませんでした。";
                }
            } catch (error) {
                this.unassignedId = [];
                this.error = "エラーが発生しました。もう一度お試しください。";
            }
        },
    },
};
</script>