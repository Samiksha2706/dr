// browser.js
/*
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';
console.log('Browser file executed. lol');
// Create a new Mock Service Worker instance
const worker = setupWorker(...handlers);

// Start the Mock Service Worker
worker.start();
*/
// browser.js

import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';
console.log('Browser file executed. lol');
// Create a mock service worker instance with the provided request handlers
export const worker = setupWorker(...handlers);
