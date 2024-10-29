import { createStore } from 'vuex';

const store = createStore({
    state: {
        userName: localStorage.getItem('userName') || '', // ローカルストレージからユーザー名を復元
        userId: localStorage.getItem('userId') || '',// ユーザーIDを追加
        time: localStorage.getItem('time') || ''
    },
    mutations: {
        setUserName(state, name) {
            state.userName = name; // ユーザー名を設定するミューテーション
            localStorage.setItem('userName', name); // ユーザー名をローカルストレージに保存
        },
        setUserId(state, id) {
            state.userId = id; // ユーザーIDを設定するミューテーション
            localStorage.setItem('userId', id); // ユーザーIDをローカルストレージに保存
        },
        setTime(state, time) {
            state.time = time;
            localStorage.setItem('time', time);
        }
    },
    actions: {
        setUserName({ commit }, name) {
            commit('setUserName', name); // ユーザー名を設定するアクション
        },
        setUserId({ commit }, id) {
            commit('setUserId', id); // ユーザーIDを設定するアクション
        },
        setTime({ commit }, time) {
            commit('time', time);
        }
    },
    getters: {
        userName: (state) => state.userName, // ユーザー名を取得するゲッター
        userId: (state) => state.userId, // ユーザーIDを取得するゲッター
        time: (state) => state.time
    }
});

export default store;
