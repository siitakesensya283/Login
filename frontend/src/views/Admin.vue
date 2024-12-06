<template>
    <div class="content">
        <main>
            <section class="user-section">
                <router-link to='/create'>新規アカウント追加</router-link><br>
                <router-link to='/unassigned'>未使用アカウントの確認</router-link>
            </section>
        </main>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import "@/assets/style.css";

export default {
    data() {
        return {
        };
    },
    computed: {
        ...mapGetters([]),
    },
    methods: {
        ...mapMutations([]),
    },
};
</script>