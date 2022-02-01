import fs from 'fs';
import path from 'path';

import { App, BrowserWindow } from 'electron';

export default function development(app: App, windows: BrowserWindow[]) {
    ['main.js', 'preload.js'].forEach((file) => {
        try {
            fs.watch(path.resolve(__dirname, file), () => {
                app.relaunch();
                app.exit();
            });
        } catch (e: any) {
            //ignore errors
        }
    });
    ['renderer.js', '../index.html'].forEach((file) => {
        try {
            fs.watch(path.resolve(__dirname, file), () => {
                windows.forEach((win) => win.reload());
            });
        } catch (e: any) {
            //ignore errors
        }
    });
}
