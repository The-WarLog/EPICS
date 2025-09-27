import { Schema, model } from "mongoose";

/**
 * User model schema.
 * Represents a user with name, email, password, and admin status.
 * Adds a virtual "profile" referencing UserProfileDetails.
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
    default: false, // this one is for admin user if he is not admin then false
  }
}, {
  timestamps: true
});

// Virtual relation to user profile details (one-to-one)
UserSchema.virtual('profile', {
  ref: 'UserProfileDetails',
  localField: '_id',
  foreignField: 'user',
  justOne: true
});
UserSchema.set('toObject',{virtuals:true})
UserSchema.set('toJSON',{virtuals:true})

export default model("User", UserSchema);