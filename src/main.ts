import path from 'path';
import { app, BrowserWindow } from 'electron';
import development from './utils/development';

function createMainWindow() {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    window.loadFile('index.html');

    return window;
}

app.on('ready', () => {
    const windows = [createMainWindow()];
    if (process.env.NODE_ENV !== 'production') development(app, windows);
});

app.on('window-all-closed', () => {
    app.quit();
});
