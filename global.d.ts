// global.d.ts
export {}

declare global {
  interface Window {
    gtag?: (...args: [string, string, Record<string, unknown>?] | [string, Record<string, unknown>]) => void;
  }
}
