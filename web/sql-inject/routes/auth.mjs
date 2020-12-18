import express from 'express';
import { check, body } from 'express-validator';

import * as authController from '../controllers/auth.mjs';
import User from '../models/User.mjs';

const router = express.Router();

router.get('/signup', authController.getSignup);

router.post('/signup',
  [
    check('email')
      .trim()
      .isEmail()
      .withMessage('Enter a valid email')
      .custom(async (email) => {
        const [existingUsers] = await User.findByEmail(email);
        if (existingUsers.length > 0) {
          throw new Error('The email is already in use');
        }
      }),
    body('password', 'Enter password with only number or text & at least 5 characters')
      .isLength({ min: 5, max: 30 })
      .isAlphanumeric(),
  ],
  authController.postSignup);

export default router;
