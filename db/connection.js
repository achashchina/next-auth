import mongoose from 'mongoose';

const connectMongo = async () => {
  const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  };
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URL, options);

    connection.readyState == 1 ? Promise.resolve(true) : null;
  } catch (error) {
    Promise.reject(error);
    throw new Error(error)
  }
};

export default connectMongo;
