import Router from 'express';
import { login, Register } from '../auth/auth.controller.js';

const router = Router();

router.post('/register', Register);
router.post('/login', login);