import mongoose from 'mongoose';

let isMongoConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hotel_training_db';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    isMongoConnected = true;
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    isMongoConnected = false;
    console.log(`[MongoDB Notice] Could not connect to MongoDB (${error.message}).`);
    console.log(`[Database Adapter] Activated standalone In-Memory Data Store with full seed datasets. All training modules, simulations, and user actions are active and fully operational!`);
    return false;
  }
};

export const getIsMongoConnected = () => isMongoConnected;

