import '@testing-library/jest-dom/vitest'

// mock canvas for chart.js
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: () => null,
})
