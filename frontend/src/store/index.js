import { createStore } from 'vuex';

const store = createStore({
    state: {
        userName: '' // ユーザー名を格納するための状態
    },
    mutations: {
        setUserName(state, name) {
            state.userName = name; // ユーザー名を設定するミューテーション
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
