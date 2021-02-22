import pkg              from "../../package.json";
import updateApp        from "@/utils/updateApp";
import initLocalStorage from "./initLocalStorage";

if (localStorage.getItem("appVersion") === null) {
    localStorage.setItem("settings", JSON.stringify(initLocalStorage.settings));
    localStorage.setItem("data", JSON.stringify(initLocalStorage.data));
    localStorage.setItem("appVersion", pkg.version);
}

updateApp();

export default {
    showLyrics : false,
    liked      : {
        songs: [],
    },
    contextMenu: {
        clickObjectID: 0,
        showMenu     : false,
    },
    toast      : {
        show : false,
        text : "",
        timer: null,
    },
    modals     : {
        addTrackToPlaylistModal: {
            show           : false,
            selectedTrackID: 0,
        },
        newPlaylistModal       : {
            show                 : false,
            afterCreateAddTrackID: 0,
        },
    },

    settings: JSON.parse(localStorage.getItem("settings")),
    data    : JSON.parse(localStorage.getItem("data")),
};
