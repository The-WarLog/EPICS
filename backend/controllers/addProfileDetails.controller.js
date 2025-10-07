import User from "../models/User.js";
import profileDetailsModel from "../models/UserProfileDetails.js";

const addProfileDetails = async (req, res, next) => {
   try {
      const userId = req.user?._id || req.body.userId || req.query.userId || req.user?.id;
      if (!userId) {
         return res.status(400).json({ message: "User id is required" });
      }
      // Check if a profile already exists for this user (profile's own _id is different; we reference by user field)
      const existingProfile = await profileDetailsModel.findOne({ user: userId });
      if (existingProfile) {
         return res.status(409).json({ message: "Profile already exists" });
      }
      const profile = new profileDetailsModel({ ...req.body, user: userId });
                                             //^^^^^^^^^^^ (...) this spreads all fields from req.body into the new profile document
      await profile.save();
      return res.status(201).json({ message: "Profile created", data: profile });
   } catch (err) {
      // Forward to error handling middleware rather than throwing (avoids unhandled rejection)
      return next ? next(err) : res.status(500).json({ message: "Something went wrong" });
   }
};

export default addProfileDetails;