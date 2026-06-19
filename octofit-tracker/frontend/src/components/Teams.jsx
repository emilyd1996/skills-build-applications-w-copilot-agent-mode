import React, { useEffect, useState } from 'react'
import { fetchJson } from '../api'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchJson('teams')
      .then((data) => setTeams(data))
      .catch((err) => setError(err.message))
  }, [])

  if (error) return <div className="alert alert-danger">{error}</div>
  return (
    <div className="container py-4">
      <h2>Teams</h2>
      <ul className="list-group">
        {teams.map((t) => (
          <li key={t._id || t.id} className="list-group-item">
            <strong>{t.name}</strong>
            <div className="small text-muted">{t.description}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
