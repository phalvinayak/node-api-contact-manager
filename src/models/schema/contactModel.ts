import { UserDocument } from "@models/schema/userModel";
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add the contact name"],
    },
    email: {
      type: String,
      required: [true, "Please add the contact email address"],
    },
    phone: {
      type: String,
      required: [true, "Please add the contact phone number"],
    },
  },
  {
    timestamps: true,
  }
);

export interface ContactInput {
  user: UserDocument["_id"];
  name: string;
  email: string;
  phone: string;
}

export interface ContactDocument extends ContactInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

export default mongoose.model<ContactDocument>("Contact", contactSchema);
