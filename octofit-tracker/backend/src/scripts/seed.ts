import { connectToDatabase } from '../config/database'
import User from '../models/user'
import Team from '../models/team'
import Workout from '../models/workout'
import Activity from '../models/activity'

// Seed the octofit_db database with test data
async function seed() {
  await connectToDatabase()

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Workout.deleteMany({}),
    Activity.deleteMany({})
  ])

  const teamAlpha = await Team.create({
    name: 'Team Alpha',
    description: 'Focused on strength and endurance challenges.'
  })

  const teamPulse = await Team.create({
    name: 'Pulse Warriors',
    description: 'Runners and cyclists competing for leaderboard placement.'
  })

  const users = await User.create([
    { name: 'Ava Brooks', email: 'ava.brooks@example.com', role: 'coach', team: teamAlpha._id },
    { name: 'Jordan Lee', email: 'jordan.lee@example.com', role: 'member', team: teamAlpha._id },
    { name: 'Mia Patel', email: 'mia.patel@example.com', role: 'member', team: teamPulse._id },
    { name: 'Noah Kim', email: 'noah.kim@example.com', role: 'member', team: teamPulse._id }
  ])

  teamAlpha.members = [users[0]._id, users[1]._id]
  teamPulse.members = [users[2]._id, users[3]._id]
  await teamAlpha.save()
  await teamPulse.save()

  const workouts = await Workout.create([
    {
      name: 'Morning HIIT',
      category: 'Cardio',
      durationMinutes: 30,
      difficulty: 'Intermediate',
      caloriesBurned: 320
    },
    {
      name: 'Strength Builder',
      category: 'Strength',
      durationMinutes: 45,
      difficulty: 'Advanced',
      caloriesBurned: 410
    },
    {
      name: 'Recovery Yoga',
      category: 'Flexibility',
      durationMinutes: 25,
      difficulty: 'Beginner',
      caloriesBurned: 120
    }
  ])

  await Activity.create([
    {
      user: users[0]._id,
      workout: workouts[0]._id,
      team: teamAlpha._id,
      date: new Date(),
      durationMinutes: 30,
      distanceKm: 5,
      caloriesBurned: 320,
      notes: 'Strong interval session',
      type: 'run'
    },
    {
      user: users[1]._id,
      workout: workouts[1]._id,
      team: teamAlpha._id,
      date: new Date(Date.now() - 86400000),
      durationMinutes: 45,
      distanceKm: 0,
      caloriesBurned: 410,
      notes: 'Full-body strength session',
      type: 'strength'
    },
    {
      user: users[2]._id,
      workout: workouts[2]._id,
      team: teamPulse._id,
      date: new Date(Date.now() - 2 * 86400000),
      durationMinutes: 25,
      distanceKm: 0,
      caloriesBurned: 120,
      notes: 'Recovery and mobility',
      type: 'yoga'
    },
    {
      user: users[3]._id,
      workout: workouts[0]._id,
      team: teamPulse._id,
      date: new Date(Date.now() - 3 * 86400000),
      durationMinutes: 30,
      distanceKm: 6,
      caloriesBurned: 340,
      notes: 'Fast-paced morning run',
      type: 'run'
    }
  ])

  console.log('Seed the octofit_db database with test data')
  console.log(`Created ${users.length} users, ${workouts.length} workouts, and 4 activities.`)
  process.exit(0)
}

seed().catch((error) => {
  console.error('Seed error:', error)
  process.exit(1)
})
