import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;

  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

//  the pre function runs on every save event,
// it takes the users password, converts it into a hash
// and stores it into the database
userSchema.pre("save", async function (next) {
  const user = this as IUser;

  const hash = await bcrypt.hash(user.password, 10);

  this.password = hash;

  next();
});

const comparePassword = async function (password: string) {
  const user = this as IUser;

  const isPasswordValid = await bcrypt.compare(password, user.password);

  return isPasswordValid;
};

userSchema.methods.comparePassword = comparePassword;

const User = mongoose.model<IUser & mongoose.Document>("User", userSchema);

export default User;
