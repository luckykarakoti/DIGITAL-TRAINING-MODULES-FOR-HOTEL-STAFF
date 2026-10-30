import mongoose from 'mongoose';

const LessonSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  duration: { type: String, default: '10 min' },
  type: { type: String, default: 'sop-guide' },
  overview: String,
  keyStandards: [String],
  steps: [
    {
      step: Number,
      action: String,
      detail: String
    }
  ],
  goldenRule: String
});

const QuizQuestionSchema = new mongoose.Schema({
  id: String,
  question: String,
  options: [String],
  correctAnswer: Number,
  explanation: String
});

const ModuleSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  department: { type: String, required: true },
  category: String,
  difficulty: { type: String, enum: ['Foundational', 'Intermediate', 'Advanced'], default: 'Foundational' },
  duration: String,
  icon: String,
  coverImage: String,
  summary: String,
  learningObjectives: [String],
  lessons: [LessonSchema],
  quiz: {
    passingScore: { type: Number, default: 80 },
    questions: [QuizQuestionSchema]
  },
  certification: {
    badgeTitle: String,
    code: String,
    validMonths: Number
  }
}, { timestamps: true });

export const Module = mongoose.model('Module', ModuleSchema);

