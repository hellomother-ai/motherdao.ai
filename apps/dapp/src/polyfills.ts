// These are required for Rainbowkit to work
// see https://www.rainbowkit.com/docs/installation#vite

window.global = window.global ?? window;
window.process = window.process ?? { env: {} }; // Minimal process polyfill

export {};
