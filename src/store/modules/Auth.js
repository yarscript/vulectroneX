import axios from "axios";

const state = {
    status: '',
    token : localStorage.getItem('token') ?? '',
}

const mutations = {
    AUTH_UPDATE(state, { key, value }) {
        state[key] = value;
    },
}


const actions = {
    login : ({ commit }, user) => (new Promise(
            (resolve, reject) => {
                commit('AUTH_UPDATE', { key: 'status', value: 'auth_request' });

                axios({ url: 'http://time.tracker/api/login', data: user, method: 'POST' })
                    .then(response => {
                        /** TODO['Auth'] Encapsulate token prefix */
                        const token = 'Bearer ' + response.data.token;

                        localStorage.setItem('token', token);
                        axios.defaults.headers.common['Authorization'] = token;

                        if (token.length > 0) {
                            commit('AUTH_UPDATE', { key: 'token', value: token })
                            commit('AUTH_UPDATE', { key: 'status', value: 'auth_success' })
                        } else {
                            commit('AUTH_UPDATE', { key: 'status', value: 'auth_error' })
                            commit('AUTH_UPDATE', { key: 'token', value: '' })
                        }
                        resolve(token);
                    })
                    .catch(err => {
                        commit('AUTH_UPDATE', { key: 'status', value: 'auth_error' })
                        localStorage.removeItem('token')
                        reject(err)
                    })
            }
        )
    ),
    logout: ({ commit }) => {
        localStorage.removeItem('token')
        commit('logout')
    }
}

const getters = {
    is_logged_in(state) {
        return !!state.token;
    },
}

export default {
    state,
    mutations,
    actions,
    getters,
}
