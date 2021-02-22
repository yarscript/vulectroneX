import axios          from "axios";
import { me, logout } from "@/api/user";
import { text }       from "express";

const state = {
    status: '',
    data  : {
        user_uuid        : '',
        first_name       : '',
        last_name        : '',
        email            : '',
        email_verified_at: '',
        created_at       : '',
        updated_at       : '',
        deleted_at       : '',
    }
}

const mutations = {
    UPDATE_USER(state, { key, value }) {
        state[key] = typeof state[key] === 'object' ? { ...state[key], ...value } : value
    }
}


const actions = {
    constructUser({ commit }) {
        return new Promise((resolve, reject) => {
                commit('UPDATE_USER', { key: 'status', value: 'INIT_REQUEST' })

                me().then(user => {
                    if (user?.user_uuid?.length > 0) {
                        commit('UPDATE_USER', { key: 'data', value: user })
                        commit('UPDATE_USER', { key: 'status', value: 'INIT_SUCCESS' })

                        resolve(user)
                    } else {
                        commit('UPDATE_USER', { key: 'status', value: 'INIT_FAILED' })
                        reject(user)
                    }
                }).catch(err => {
                    console.log(err)
                    commit('UPDATE_USER', { key: 'status', value: 'INIT_FAILED' })
                    reject(err)
                });
            }
        )
    },
    destructUser({ state, commit }) {
        return new Promise((resolve, reject) => {
            logout()
                .then(res => {
                    const value = {};
                    for (const key in Object.keys(state.data.user)) value[key] = '';
                    commit('updateData', { key: 'user', value });
                })
                .catch(err => console.log(err))
        })
    },
}

const getters = {
    user(state) {
        console.log(state.data)
        return state.data;
    },
    is_user_init() {
        return !!state.data.user_uuid;
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
}
