<template>
    <div class="content">
        <main class="dashboard-content">
            <section class="user-section">

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
        ...mapGetters(["userName"]),
    },
    methods: {
        ...mapMutations([]),

    },
};
</script>