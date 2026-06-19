import React, { useEffect, useState } from 'react'
import { fetchJson } from '../api'

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const url = (import.meta.env.VITE_CODESPACE_NAME && import.meta.env.VITE_CODESPACE_NAME !== 'undefined')
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities`
      : 'http://localhost:8000/api/activities'

    fetchJson(url)
      .then((data) => setActivities(data))
      .catch((err) => setError(err.message))
  }, [])

  if (error) return <div className="alert alert-danger">{error}</div>
  return (
    <div className="container py-4">
      <h2>Activities</h2>
      <ul className="list-group">
        {activities.map((a) => (
          <li key={a._id || a.id} className="list-group-item">
            <div><strong>{a.type}</strong> — {a.durationMinutes} min — {a.caloriesBurned} cal</div>
            <div className="small text-muted">{new Date(a.date).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
