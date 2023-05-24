import mongoose from "mongoose";
import { CONNECTION_URL } from "@src/config/evn.config";

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(CONNECTION_URL);
    console.log(
      "Database Connection successful",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit;
  }
};

export default connectDb;
