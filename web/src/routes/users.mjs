import express from 'express';
import { check, body } from 'express-validator';

import requireAuth from '../middlewares/require-auth.mjs';
import * as usersController from '../controllers/users.mjs';
import User from '../models/User.mjs';

/*
 * Sub-route /users/*
 *        -> /users/
 *        -> /users/signup
 *        -> /users/login
 *        -> /users/logout
 *        -> /users/profile
 */
const router = express.Router();

router.get('/', requireAuth, usersController.getIndex);

router.get('/signup', usersController.getSignup);

router.post('/signup',
  [
    body('name')
      .trim()
      .isString()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Enter your name'),
    check('email')
      .trim()
      .isEmail()
      .escape()
      .withMessage('Enter a valid email')
      .custom(async (email) => {
        const [existingUsers] = await User.findByEmail(email);
        if (existingUsers.length > 0) {
          const operationError = new Error('The email is already in use');
          operationError.httpStatusCode = 409;
          throw operationError;
        }
      }),
    body('password')
      .isLength({ min: 5, max: 30 })
      .isAlphanumeric()
      .withMessage('Enter password with only number or text & at least 5 characters'),
  ],
  usersController.postSignup);

router.get('/login', usersController.getLogin);

router.post('/login',
  [
    body('email')
      .trim()
      .isEmail()
      .withMessage('Enter a valid email'),
    body('password')
      .isLength({ min: 5, max: 30 })
      .isAlphanumeric()
      .withMessage('Enter your password with only number or text & at least 5 characters'),
  ],
  usersController.postLogin);

router.post('/logout', requireAuth, usersController.postLogout);

router.get('/profile', requireAuth, usersController.getProfile);

export default router;
