export const API_BASE_URL = (() => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME ?? ''
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`
  }
  return 'http://localhost:8000'
})()
