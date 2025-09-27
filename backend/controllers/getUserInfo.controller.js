import User from "../models/User.js";
//import profileDetailsModel from "../models/UserProfileDetails.js";

const getUserProfile = async (req, res) => {
    try {
        const userId = req.params.id || req.user?._id || req.body.userId || req.query.userId || req.user?.id;
        if (!userId) return res.status(400).json({ message: "User id is required" });
        const data = await User.findById(userId).populate('profile');
        if (!data) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ success: true, data });
    } catch (err) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export default getUserProfile;