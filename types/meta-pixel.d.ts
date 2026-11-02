export {};

declare global {
  interface Window {
    fbq?: (...args: [string, ...unknown[]]) => void;
  }
}
