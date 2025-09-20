import { Schema, model } from "mongoose";

/**
 * User model schema.
 * Represents a user with name, email, password, and admin status.
 * - name: User's full name (required)
 * - email: User's email address (required, unique)
 * - password: User's hashed password (required)
 * - isAdmin: Boolean flag for admin privileges (default: false)
 */
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false, //this one is for admin user if he is not admin then false
  }
});

export default model("User", UserSchema);