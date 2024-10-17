import { model, models, Schema } from "mongoose";

// Set the validation for email and password fields.
const UserSchema = new Schema(
  {
    name: { type: String, required: false },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },
    image: { type: String },
    googleId: { type: String }, // To store Google OAuth ID if applicable
  },
  { timestamps: true }
);

export const User = models?.User || model("User", UserSchema);
