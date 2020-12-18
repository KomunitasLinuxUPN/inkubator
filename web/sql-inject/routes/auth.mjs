import express from 'express';
// import { check, body } from 'express-validator';

import * as authController from '../controllers/auth.mjs';

const router = express.Router();

router.get('/signup',
  // [
  //   check('email')
  //     .trim()
  //     .isEmail()
  //     .withMessage('Enter a valid email')
  //     .custom(async (value) => {
  //       const user = await User.findOne({ email: value });
  //       if (user) throw new Error('The email is already used');
  //     }),
  //   body('password', 'Enter password with only number or text & at least 5 characters')
  //     .isLength({ min: 5, max: 30 })
  //     .isAlphanumeric(),
  //   body('confirmPassword')
  //     .custom((value, { req }) => {
  //       if (value !== req.body.password) {
  //         throw new Error('Password have to match!');
  //       }
  //       return true;
  //     }),
  // ],
  authController.getSignup);

router.post('/signup', authController.postSignup);

export default router;
