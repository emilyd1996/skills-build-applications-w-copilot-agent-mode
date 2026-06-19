import { Router } from 'express'
import Activity from '../models/activity'
import User from '../models/user'

const router = Router()

router.get('/', async (req, res) => {
  const leaderboard = await Activity.aggregate([
    {
      $group: {
        _id: '$user',
        totalCalories: { $sum: '$caloriesBurned' },
        totalMinutes: { $sum: '$durationMinutes' },
        totalDistance: { $sum: '$distanceKm' }
      }
    },
    {
      $sort: { totalCalories: -1, totalMinutes: -1 }
    },
    {
      $limit: 10
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user'
      }
    },
    {
      $unwind: '$user'
    },
    {
      $project: {
        user: { _id: '$user._id', name: '$user.name', email: '$user.email' },
        totalCalories: 1,
        totalMinutes: 1,
        totalDistance: 1
      }
    }
  ])

  res.json(leaderboard)
})

export default router
