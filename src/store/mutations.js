export default {
    updateLikedSongs(state, trackIDs) {
        state.liked.songs = trackIDs;
        state.player.sendSelfToIpcMain();
    },
    changeLang(state, lang) {
        state.settings.lang = lang;
    },
    changeMusicQuality(state, value) {
        state.settings.musicQuality = value;
    },
    updateSettings(state, { key, value }) {
        state.settings[key] = value;
    },
    updateData(state, { key, value }) {
        state.data[key] = value;
    },
    togglePlaylistCategory(state, name) {
        const cat = state.settings.playlistCategories.find((c) => c.name === name);

        cat.enable = !cat.enable;
        state.settings.playlistCategories =
            state.settings.playlistCategories.map(c => c.name === name ? cat : c);
    },
    updateToast(state, toast) {
        state.toast = toast;
    },
    updateModal(state, { modalName, key, value }) {
        state.modals[modalName][key] = value;
    },
    toggleLyrics(state) {
        state.showLyrics = !state.showLyrics;
    },
};
