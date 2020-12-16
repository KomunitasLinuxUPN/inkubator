import express from 'express';

import * as authController from '../controllers/auth.mjs';

const router = express.Router();

router.get('/signup', authController.getSignup);

export default router;
