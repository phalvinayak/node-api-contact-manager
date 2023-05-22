import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the username"],
    },
    email: {
      type: String,
      required: [true, "Please add the user email address"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      required: [true, "Pleae add the user Password"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
