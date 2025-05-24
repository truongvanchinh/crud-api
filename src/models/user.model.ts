import mongoose, {Schema, Document} from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  age: number;
  isDeleted: boolean;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false }
  }, { timestamps: true } // Automatically add createdAt and updatedAt fields
)

export default mongoose.model<IUser>("User", userSchema);