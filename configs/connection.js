import mongoose from "mongoose";

const connectDB = async () => {
  const db = process.env.DB;
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database connected successfully")
    );
    await mongoose.connect(`${process.env.MONGODB_URI}/${db}`);
  } catch (error) {
    console.error(error.message);
  }
};

export default connectDB;
