import express from 'express'
import { connectToDatabase } from './config/database'
import usersRouter from './routes/users'
import teamsRouter from './routes/teams'
import activitiesRouter from './routes/activities'
import workoutsRouter from './routes/workouts'
import leaderboardRouter from './routes/leaderboard'

const app = express()
const port = Number(process.env.PORT ?? 8000)
const codeSpaceName = process.env.CODESPACE_NAME

app.use(express.json())
app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/workouts', workoutsRouter)
app.use('/api/leaderboard', leaderboardRouter)

app.get('/', (req, res) => {
  res.json({ message: 'Octofit Tracker backend is running' })
})

connectToDatabase()
  .then(() => {
    console.log('Connected to MongoDB at octofit_db')
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`)
      if (codeSpaceName) {
        console.log(`Codespace API URL: https://${codeSpaceName}-8000.app.github.dev`)
      }
    })
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  })
