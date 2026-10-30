import mongoose from 'mongoose';

const CertificateSchema = new mongoose.Schema({
  certificateId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  userDepartment: String,
  moduleId: { type: String, required: true },
  moduleTitle: { type: String, required: true },
  badgeTitle: String,
  score: Number,
  issuedDate: { type: String, required: true },
  expiryDate: String,
  verificationCode: String,
  hotel: { type: String, default: 'The Grand Luxe Palace & Spa' }
}, { timestamps: true });

export const Certificate = mongoose.model('Certificate', CertificateSchema);

