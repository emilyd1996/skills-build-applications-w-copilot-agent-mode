import React, { useEffect, useState } from 'react'
import { fetchJson } from '../api'

export default function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchJson('leaderboard')
      .then((data) => setEntries(data))
      .catch((err) => setError(err.message))
  }, [])

  if (error) return <div className="alert alert-danger">{error}</div>
  return (
    <div className="container py-4">
      <h2>Leaderboard</h2>
      <ol className="list-group list-group-numbered">
        {entries.map((e) => (
          <li key={e.user?._id || e.user?.id || e._id} className="list-group-item">
            <div><strong>{e.user?.name || e.user?.email}</strong></div>
            <div className="small text-muted">Calories: {e.totalCalories} • Minutes: {e.totalMinutes}</div>
          </li>
        ))}
      </ol>
    </div>
  )
}
