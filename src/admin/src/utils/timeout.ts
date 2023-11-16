export const timeout = (duration = 3) => new Promise(r => setTimeout(r, duration * 1000))
