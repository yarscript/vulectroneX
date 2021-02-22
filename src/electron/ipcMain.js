import { app, ipcMain, dialog, desktopCapturer } from "electron";

export function initIpcMain(win, store) {
    ipcMain.on("close", (e) => {
        if (process.platform === "darwin") {
            win.quit();
        }
        e.preventDefault(); //阻止默认行为
        dialog
            .showMessageBox({
                type     : "info",
                title    : "Information",
                cancelId : 2,
                defaultId: 0,
                message  : "确定要关闭吗？",
                buttons  : [ "最小化", "直接退出" ],
            })
            .then((result) => {
                if (result.response === 0) {
                    e.preventDefault();
                    win.minimize();
                } else if (result.response === 1) {
                    win = null;
                    //app.quit();
                    app.exit();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    });

    ipcMain.on("minimize", () => {
        win.minimize();
    });

    ipcMain.on("settings", (event, options) => {
        store.set("settings", options);
    });

    ipcMain.on('captureScreen', () => {
        desktopCapturer
            .getSources({types: ['screenshot']})
            .then(sources => {
                for (const source of sources) {
                    let test = true;
                    console.log('captureScreen::source ===>>', source)
                }
            })
    })
}
