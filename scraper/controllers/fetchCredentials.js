import mongoose from "mongoose";
import User from "../models/userSchema.js";

mongoose.set("strictQuery", true);

const connect = () => {
  return mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const findUser = () => {
  return User.find()
    .then((users) => {
      return users;
    })
    .catch((error) => {
      console.error("Error reading users:", error);
      throw error;
    });
};

export default async function fetcher() {
  try {
    connect();
    const users = await findUser();

    return users;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
