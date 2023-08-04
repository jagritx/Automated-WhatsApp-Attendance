import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: {
    type: Number,
    required: true,
    validate: {
      validator: function (val) {
        return val.toString().length === 10;
      },
      message: (val) => `${val.value} has to be 10 digits`,
    },
  },
});

const User = mongoose.model("User", userSchema);

export default User;
