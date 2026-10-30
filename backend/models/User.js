import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['staff', 'manager', 'admin'], default: 'staff' },
  department: { type: String, default: 'General Hospitality' },
  position: { type: String, default: 'Trainee' },
  avatar: { type: String },
  hotel: { type: String, default: 'The Grand Luxe Palace & Spa' },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  streak: { type: Number, default: 1 },
  badges: [
    {
      id: String,
      title: String,
      icon: String,
      unlockedAt: String
    }
  ],
  completedModules: [String],
  inProgressModules: [
    {
      moduleId: String,
      progress: Number,
      currentLessonId: String
    }
  ]
}, { timestamps: true });

export const User = mongoose.model('User', UserSchema);

