import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';

import User from '../models/User.mjs';

export const getSignup = (req, res) => {
  const [message] = req.flash('error');
  res.render('auth/signup', {
    pageTitle: 'Signup',
    path: '/users/signup',
    errorMessage: message,
    inputErrors: [],
    oldInput: { email: '', password: '' },
  });
};

export const postSignup = async (req, res, next) => {
  const { email, password, role } = req.body;
  const inputErrors = validationResult(req);
  const [firstInputError] = inputErrors.array();

  if (!inputErrors.isEmpty()) {
    return res.status(422).render('auth/signup', {
      pageTitle: 'Signup',
      path: '/users/signup',
      errorMessage: firstInputError.msg,
      inputErrors: inputErrors.array(),
      oldInput: { email, password, role },
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User(null, email, hashedPassword, role);
    await user.save();
    return res.status(200).redirect('/users/login');
  } catch (error) {
    const operationError = new Error(error);
    operationError.httpStatusCode = 500;
    return next(operationError);
  }
};
