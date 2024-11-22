import { createStore } from "vuex";

const store = createStore({
    state: {
        userName: localStorage.getItem("userName") || "", // ローカルストレージからユーザー名を復元
        userId: localStorage.getItem("userId") || "", // ユーザーIDを追加
        startline: localStorage.getItem("startline") || "",
        gps: localStorage.getItem("gps") || "",
        can: localStorage.getItem("can") || "",
        canSpeed: localStorage.getItem("canSpeed") || "",
    },
    mutations: {
        setUserName(state, name) {
            state.userName = name; // ユーザー名を設定するミューテーション
            localStorage.setItem("userName", name); // ユーザー名をローカルストレージに保存
        },
        setUserId(state, id) {
            state.userId = id; // ユーザーIDを設定するミューテーション
            localStorage.setItem("userId", id); // ユーザーIDをローカルストレージに保存
        },
        setStartline(state, startline) {
            state.startline = startline;
            localStorage.setItem("startline", startline);
        },
        setGps(state, gps) {
            state.gps = gps;
            localStorage.setItem("gps", gps);
        },
        setCan(state, can) {
            state.can = can;
            localStorage.setItem("can", can);
        },
        setCanSpeed(state, canSpeed) {
            state.canSpeed = canSpeed;
            localStorage.setItem("canSpeed", canSpeed);
        }
    },
    actions: {
        setUserName({ commit }, name) {
            commit("setUserName", name); // ユーザー名を設定するアクション
        },
        setUserId({ commit }, id) {
            commit("setUserId", id); // ユーザーIDを設定するアクション
        },
        setStartline({ commit }, startline) {
            commit("setStartline", startline);
        },
        setGps({ commit }, gps) {
            commit("setGps", gps);
        },
        setCan({ commit }, can) {
            commit("setCan", can);
        },
        setCanSpeed({ commit }, canSpeed) {
            commit("setCanSpeed", canSpeed);
        }
    },
    getters: {
        userName: (state) => state.userName, // ユーザー名を取得するゲッター
        userId: (state) => state.userId, // ユーザーIDを取得するゲッター
        startline: (state) => state.startline,
        gps: (state) => state.gps,
        can: (state) => state.can,
        canSpeed: (state) => state.canSpeed,
    },
});

export default store;
