import mongoose from "mongoose";

let isConnected = false;

export const ConnectMongoDb = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("DB connected");
  } catch (err) {
    console.log("DB Connection Error: ", err);
  }
};
