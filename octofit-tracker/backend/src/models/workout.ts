import mongoose, { Schema, Document } from 'mongoose'

export interface IWorkout extends Document {
  name: string
  category: string
  durationMinutes: number
  difficulty: string
  caloriesBurned: number
  createdAt: Date
}

const WorkoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true },
  caloriesBurned: { type: Number, required: true },
  createdAt: { type: Date, default: () => new Date() }
})

const Workout = mongoose.model<IWorkout>('Workout', WorkoutSchema)
export default Workout
