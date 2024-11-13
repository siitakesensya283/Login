import { createStore } from "vuex";

const store = createStore({
    state: {
        userName: localStorage.getItem("userName") || "", // ローカルストレージからユーザー名を復元
        userId: localStorage.getItem("userId") || "", // ユーザーIDを追加
        timeline: localStorage.getItem("timeline") || "",
        sessionTimeline: localStorage.getItem("sessionTimeline") || "",
        sessionVehiclespeed: localStorage.getItem("sessionVehiclespeed") || "",
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
        setTimeline(state, timeline) {
            state.timeline = timeline;
            localStorage.setItem("timeline", timeline);
        },
        setSessionTimeline(state, sessionTimeline) {
            state.sessionTimeline = sessionTimeline;
            localStorage.setItem("sessionTimeline", sessionTimeline);
        },
        setSessionVehiclespeed(state, sessionVehiclespeed) {
            state.sessionVehiclespeed = sessionVehiclespeed;
            localStorage.setItem("sessionVehiclespeed", sessionVehiclespeed);
        },
    },
    actions: {
        setUserName({ commit }, name) {
            commit("setUserName", name); // ユーザー名を設定するアクション
        },
        setUserId({ commit }, id) {
            commit("setUserId", id); // ユーザーIDを設定するアクション
        },
        setTimeline({ commit }, timeline) {
            commit("time", timeline);
        },
        setSessionTimeline({ commit }, sessionTimeline) {
            commit("sessionTimeline", sessionTimeline);
        },
        setSessionVehiclespeed({ commit }, sessionVehiclespeed) {
            commit("sessionVehiclespeed", sessionVehiclespeed);
        },
    },
    getters: {
        userName: (state) => state.userName, // ユーザー名を取得するゲッター
        userId: (state) => state.userId, // ユーザーIDを取得するゲッター
        timeline: (state) => state.timeline,
        sessionTimeline: (state) => state.sessionTimeline,
        sessionVehiclespeed: (state) => state.sessionVehiclespeed,
    },
});

export default store;
