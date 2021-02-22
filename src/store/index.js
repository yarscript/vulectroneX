import Vue       from 'vue';
import Vuex      from 'vuex';
import state     from "./state";
import actions   from "./actions";
import mutations from "./mutations";
import getters   from "@/store/getters";

import saveToLocalStorage        from "./plugins/localStorage";
import { changeAppearance }      from "@/utils/common";
import { getSendSettingsPlugin } from "./plugins/sendSettings";

import modules from './modules'


Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';
const plugins = [ saveToLocalStorage ];

if (process.env.IS_ELECTRON === true) {
    let sendSettings = getSendSettingsPlugin();
    plugins.push(sendSettings);
}

const options = {
    state,
    plugins,
    getters,
    actions,
    mutations,
    modules,
    strict : debug,
}
const store = new Vuex.Store(options);

if ([ undefined, null ].includes(store.state.settings.lang)) {
    let lang = "en";
    if (navigator.language.slice(0, 2) === "zh") lang = "zh-CN";
    store.state.settings.lang = lang;
    localStorage.setItem("settings", JSON.stringify(store.state.settings));
}

changeAppearance(store.state.settings.appearance);

window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
        if (store.state.settings.appearance === "auto") {
            changeAppearance(store.state.settings.appearance);
        }
    });


export default store;
