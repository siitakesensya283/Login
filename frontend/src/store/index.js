import { createStore } from 'vuex';

const store = createStore({
    state: {
        userName: localStorage.getItem('userName') || '' // ローカルストレージからユーザー名を復元
    },
    mutations: {
        setUserName(state, name) {
            state.userName = name; // ユーザー名を設定するミューテーション
            localStorage.setItem('userName', name); // ユーザー名をローカルストレージに保存
        }
    },
    actions: {
        setUserName({ commit }, name) {
            commit('setUserName', name); // ユーザー名を設定するアクション
        }
    },
    getters: {
        userName: (state) => state.userName // ユーザー名を取得するゲッター
    }
});

export default store;
