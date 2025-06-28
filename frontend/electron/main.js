/* eslint-disable no-undef */
import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
    },
    icon: path.join(__dirname, "/realestate.ico"),
    frame: false,
    transparent: false,
  });

  const isDev = process.env.VITE_IS_ELECTRON === "true";
  mainWindow.webContents.openDevTools();

  if (isDev) {
    mainWindow.loadURL("http://localhost:3000").catch((err) => {
      console.error("Failed to load Vite dev server:", err);
      setTimeout(() => mainWindow.loadURL("http://localhost:3000"), 1000);
    });
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }
};

ipcMain.on("minimize-window", () => {
  BrowserWindow.getFocusedWindow()?.minimize();
});

ipcMain.on("toggle-maximize-window", () => {
  const win = BrowserWindow.getFocusedWindow();
  if (!win) {
    return;
  }
  if (win.isMaximized()) {
    win.unmaximize();
  } else {
    win.maximize();
  }
});

ipcMain.on("close-window", () => {
  BrowserWindow.getFocusedWindow()?.close();
});

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
