import { model, models, Schema } from "mongoose";

// Set the validation for email and password fields.
const UserSchema = new Schema(
  {
    name: { type: String },
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
      validate: (pass) => {
        if (!pass?.length || pass.length < 5) {
          new Error("Password must be at least 5 characters");
          return false;
        }
      },
    },
    image: { type: String },
    googleId: { type: String }, // To store Google OAuth ID if applicable
  },
  { timestamps: true }
);

export const User = models?.User || model("User", UserSchema);
