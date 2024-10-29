import { createStore } from "vuex";

const store = createStore({
    state: {
        userName: localStorage.getItem("userName") || "", // ローカルストレージからユーザー名を復元
        userId: localStorage.getItem("userId") || "", // ユーザーIDを追加
        timeline: localStorage.getItem("timeline") || "",
        timeId: localStorage.getItem("timeId") || "",
        event: localStorage.getItem("event") || "",
        huwahuwaTime: localStorage.getItem("huwahuwaTime") || "",
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
        setTimeId(state, timeId) {
            state.timeId = timeId;
            localStorage.setItem("timeId", timeId);
        },
        setEvent(state, event) {
            state.event = event;
            localStorage.setItem("event", event);
        },
        setHuwahuwaTime(state, huwahuwaTime) {
            state.huwahuwaTime = huwahuwaTime;
            localStorage.setItem("huwahuwaTime", huwahuwaTime);
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
        setTimeId({ commit }, timeId) {
            commit("timeId", timeId);
        },
        setEvent({ commit }, event) {
            commit("event", event);
        },
        setHuwahuwaTime({ commit }, huwahuwaTime) {
            commit("huwahuwaTime", huwahuwaTime);
        },
    },
    getters: {
        userName: (state) => state.userName, // ユーザー名を取得するゲッター
        userId: (state) => state.userId, // ユーザーIDを取得するゲッター
        timeline: (state) => state.timeline,
        timeId: (state) => state.timeId,
        event: (state) => state.event,
        huwahuwaTime: (state) => state.huwahuwaTime,
    },
});

export default store;
