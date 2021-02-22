import { desktopCapturer } from "electron";

const state = {
    timeTracking: {
        screener       : null,
        screenshot_path: '/Users/user/www/front/electron-vue/public/screenshots/',
    }
}

const getters = {
    isTracingRun(state) {
        return !!state.timeTracking.screener
    }
}

const mutations = {
    UPDATE_DASHBOARD(state, { key, value }) {
        state[key] = value;
    },

    START_TRACKING(state, screener) {
        state.timeTracking.screener = screener;
    },

    STOP_TRACKING(state) {
        clearInterval(state.timeTracking.screener);
        state.timeTracking.screener = null;
    }
}


const actions = {
    startTracking({ commit, state }) {
        const imgHandler = (img) => {
            require("fs").writeFile(
                state.screenshot_path + `${ Math.random() * Math.floor(99999) }.png`, img,
                (err) => console.log('Err: ', err)
            );
        }

        //TODO['screening']: systemPreferences.getMediaAccessStatus condition for darwin platform
        const screener = setInterval(async () => {
            const sources = await desktopCapturer.getSources({
                types           : [ 'window', 'screen' ],
                thumbnailSize   : { width: screen.width, height: screen.height },
                fetchWindowIcons: true
            })

            for (const source of sources) {
                if (!source.display_id) continue;
                imgHandler(source.thumbnail.toPNG());
                console.log(source.thumbnail.toPNG());
            }
        }, 60000);

        commit('START_TRACKING', screener)

    },
    stopTracking({ commit }) { commit('STOP_TRACKING') }
}

export default {
    state,
    mutations,
    actions,
    getters,
}
