export function getSendSettingsPlugin() {
    const electron = window.require("electron"), ipcRenderer = electron.ipcRenderer ;

    return (store) => {
        store.subscribe((mutation, state) => {
            if (mutation.type !== "updateSettings") return;

            ipcRenderer.send("settings", {
                minimizeToTray: state.settings.minimizeToTray,
            });
        });
    };
}
