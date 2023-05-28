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

export interface UserInput {
  username: string;
  email: string;
  password: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  modifiedAt: Date;
}

export default mongoose.model<UserDocument>("User", userSchema);
