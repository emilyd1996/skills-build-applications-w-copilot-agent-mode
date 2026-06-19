import mongoose, { Schema, Document } from 'mongoose'

export interface IActivity extends Document {
  user: mongoose.Types.ObjectId
  workout: mongoose.Types.ObjectId
  team?: mongoose.Types.ObjectId
  date: Date
  durationMinutes: number
  distanceKm: number
  caloriesBurned: number
  notes: string
  type: string
}

const ActivitySchema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  workout: { type: Schema.Types.ObjectId, ref: 'Workout', required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  date: { type: Date, default: () => new Date(), required: true },
  durationMinutes: { type: Number, required: true },
  distanceKm: { type: Number, default: 0 },
  caloriesBurned: { type: Number, required: true },
  notes: { type: String, default: '' },
  type: { type: String, required: true }
})

const Activity = mongoose.model<IActivity>('Activity', ActivitySchema)
export default Activity
