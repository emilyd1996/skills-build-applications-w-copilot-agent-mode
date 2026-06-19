import React, { useEffect, useState } from 'react'
import { fetchJson } from '../api'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchJson('workouts')
      .then((data) => setWorkouts(data))
      .catch((err) => setError(err.message))
  }, [])

  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <div className="container py-4">
      <h2>Workouts</h2>
      <div className="row">
        {workouts.map((w) => (
          <div key={w._id || w.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{w.name}</h5>
                <p className="card-text">{w.category} • {w.durationMinutes} min</p>
                <p className="card-text"><small className="text-muted">{w.difficulty} — {w.caloriesBurned} cal</small></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
