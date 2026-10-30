import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User } from './models/User.js';
import { Module } from './models/Module.js';
import { Certificate } from './models/Certificate.js';
import { seedUsers, seedModules } from './data/seedData.js';

dotenv.config();

const seedDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hotel_training_db';
  try {
    console.log(`Connecting to MongoDB at ${uri}...`);
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log('Connected to MongoDB. Seeding collections...');

    await User.deleteMany({});
    await Module.deleteMany({});
    await Certificate.deleteMany({});

    await User.insertMany(seedUsers);
    await Module.insertMany(seedModules);

    console.log(`Successfully seeded ${seedUsers.length} users and ${seedModules.length} training modules!`);
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
};

seedDB();

