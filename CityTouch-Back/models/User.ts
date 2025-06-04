import { IUser } from "../type/IUser";
import mongoose, { Model, Schema } from "mongoose";

const UsersSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Users: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UsersSchema);

export default Users;
