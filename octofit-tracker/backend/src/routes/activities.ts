import { Router } from 'express'
import Activity from '../models/activity'

const router = Router()

router.get('/', async (req, res) => {
  const activities = await Activity.find().populate('user workout team')
  res.json(activities)
})

router.get('/:id', async (req, res) => {
  const activity = await Activity.findById(req.params.id).populate('user workout team')
  if (!activity) return res.status(404).json({ message: 'Activity not found' })
  res.json(activity)
})

router.post('/', async (req, res) => {
  const activity = new Activity(req.body)
  await activity.save()
  res.status(201).json(activity)
})

export default router
