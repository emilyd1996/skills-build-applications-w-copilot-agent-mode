import React, { useEffect, useState } from 'react'
import { fetchJson } from '../api'

export default function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchJson('users')
      .then((data) => setUsers(data))
      .catch((err) => setError(err.message))
  }, [])

  if (error) return <div className="alert alert-danger">{error}</div>
  return (
    <div className="container py-4">
      <h2>Users</h2>
      <ul className="list-group">
        {users.map((u) => (
          <li key={u._id || u.id} className="list-group-item">
            <strong>{u.name}</strong> — {u.email}
          </li>
        ))}
      </ul>
    </div>
  )
}
