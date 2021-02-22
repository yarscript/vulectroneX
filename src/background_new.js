'use strict'

const { app, BrowserWindow, ipcMain, protocol } = require('electron');
const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer');

const url = require("url");
const path = require("path");
const fs = require("fs");

let [ count, mainWindow ] = [1];
const isDevelopment = process.env.NODE_ENV !== 'production';

if (process.env.DEBUG_ENABLE)
    app.commandLine.appendSwitch('remote-debugging-port', '9222');

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {

            // Use pluginOptions.nodeIntegration, leave this alone
            // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
            nodeIntegration: true
        }
    })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        require('vue-cli-plugin-electron-builder/lib').createProtocol('app')
        // Load the index.html when not in development
        await win.loadURL('app://./index.html')
    }

    return win
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        try {
            await installExtension(VUEJS_DEVTOOLS).then(() => {}).catch((err) => (console.log(err)))
        } catch (e) {
            console.error('Vue Devtools failed to install:', e.toString())
        }
    }
    mainWindow = createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}


/**
 *
 */
let trackingStart = (event, args) => {
}

ipcMain.on('tracking::start', (event, args) => {
    event.reply('tracking::',)
})

ipcMain.on('make::screenshot.attempt', (event, args) => {
    console.log(args)
    mainWindow.webContents.capturePage().then(image =>
    {
        console.log('capturePage::image ===>>', image)
        //writing  image to the disk
        const res = fs.writeFile(`test${count}.png`, image.toPNG(), (err) => {
            if (err) throw err
            console.log('Image Saved')
            count++
        })
        console.log('res ====>>', res)
        console.log('image ====>>', image)
    })
    event.returnValue = 'succeeded'
})
/** */


/**
 *
 */
ipcMain.on('synchronous-message', (event, arg) => {
    console.log(arg) // prints "ping"
    event.returnValue = 'pong'
})
ipcMain.on('asynchronous-message', (event, arg) => {
    console.log(arg) // prints "ping"
    event.reply('asynchronous-reply', 'pong')
})
/** */
