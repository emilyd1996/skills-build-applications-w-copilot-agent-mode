export function apiBaseUrl() {
  const codespace = import.meta.env.VITE_CODESPACE_NAME ?? ''
  if (codespace && codespace !== 'undefined') {
    return `https://${codespace}-8000.app.github.dev/api`
  }
  // safe fallback to local backend
  return 'http://localhost:8000/api'
}

// helper to normalize paginated or array responses
export async function fetchJson(path) {
  const url = `${apiBaseUrl()}/${path}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  const data = await res.json()
  // If paginated response with items/results, return that array
  if (Array.isArray(data)) return data
  if (data.items && Array.isArray(data.items)) return data.items
  if (data.results && Array.isArray(data.results)) return data.results
  // if data has a single field that's an array, return it
  const arrField = Object.values(data).find((v) => Array.isArray(v))
  if (arrField) return arrField
  return data
}
