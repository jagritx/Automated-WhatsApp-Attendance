import User from "../models/userSchema.js";
import { isMobileValid } from "../utils/mobileValidation.js";
import validateCredentials from "../services/validateCredentials.js";

const addUser = async (req, res, next) => {
  const { username, password, mobile } = req.body;

  if (!username || !password || !mobile) {
    return res.status(400).json({
      error:
        "Missing credentials. Please provide username, password, and mobile.",
    });
  }

  if (!isMobileValid(mobile)) {
    return res
      .status(400)
      .json({ error: "Invalid mobile number. It must be 10 digits." });
  }
  const credentialsValid = await validateCredentials(username, password);
  if (!credentialsValid) {
    return res.status(401).json({
      error:
        "Invalid credentials. The provided credentials do not work on the website.",
    });
  }

  const newUser = new User({
    username,
    password,
    mobile,
  });

  newUser
    .save()
    .then(() => {
      res.status(200).json({
        message: "Added!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error: "Already exists.",
      });
    });
};

export default addUser;
