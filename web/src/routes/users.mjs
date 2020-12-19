import express from 'express';
import { check, body } from 'express-validator';

import * as usersController from '../controllers/users.mjs';
import User from '../models/User.mjs';

const router = express.Router();

router.get('/', usersController.getIndex);

router.get('/signup', usersController.getSignup);

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
  usersController.postSignup);

router.get('/login', usersController.getLogin);

router.post('/login',
  [
    body('email')
      .trim()
      .isEmail()
      .withMessage('Enter a valid email'),
    body('password', 'Enter your password with only number or text & at least 5 characters')
      .isLength({ min: 5, max: 30 })
      .isAlphanumeric(),
  ],
  usersController.postLogin);

router.post('/logout', () => {});

export default router;
