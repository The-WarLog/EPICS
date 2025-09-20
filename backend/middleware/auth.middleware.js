import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const getTokenFromRequest = (req) => {
	const authHeader = req.headers?.authorization || req.headers?.Authorization;
	if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
		return authHeader.slice('Bearer '.length).trim();
	}
	if (req.cookies?.token) return req.cookies.token;
	if (req.query?.token) return req.query.token;
	return null;
};

export const requireAuth = async (req, res, next) => {
	try {
		const token = getTokenFromRequest(req);
		if (!token) return res.status(401).json({ message: 'Authentication required' });

		const payload = jwt.verify(token, process.env.JWT_SECRET);
		const userId = payload?.newUserId || payload?.userId || payload?.id || payload?._id || payload?.sub;
		if (!userId) return res.status(401).json({ message: 'Invalid token payload' });

		const user = await User.findById(userId).select('-password');
		if (!user) return res.status(401).json({ message: 'User not found' });

		req.user = user;
		req.auth = { token, payload, userId: String(user._id) };
		return next();
	} catch (err) {
		if (err?.name === 'TokenExpiredError') return res.status(401).json({ message: 'Token expired' });
		if (err?.name === 'JsonWebTokenError') return res.status(401).json({ message: 'Invalid token' });
		return next(err);
	}
};

export const requireAdmin = (req, res, next) => {
	if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
	if (!req.user.isAdmin) return res.status(403).json({ message: 'Forbidden: admin only' });
	return next();
};

export default { requireAuth, requireAdmin };

 