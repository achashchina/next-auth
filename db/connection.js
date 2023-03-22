import mongoose from 'mongoose';

const connectMongo = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URL);

    connection.readyState == 1 ? Promise.resolve(true) : null;
  } catch (error) {
    Promise.reject(error);
  }
};

export default connectMongo;
