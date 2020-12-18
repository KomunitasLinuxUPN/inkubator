import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';

import User from '../models/User.mjs';

export const getSignup = (req, res) => {
  const [message] = req.flash('error');
  res.render('users/signup', {
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
    return res.status(422).render('users/signup', {
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

export const getLogin = (req, res) => {
  const [message] = req.flash('error');
  res.render('users/login', {
    pageTitle: 'Login',
    path: '/users/login',
    errorMessage: message,
    inputErrors: [],
    oldInput: { email: '', password: '' },
  });
};

export const postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const inputErrors = validationResult(req);
  const [firstInputError] = inputErrors.array();

  if (!inputErrors.isEmpty()) {
    return res.status(422).render('users/login', {
      pageTitle: 'Login',
      path: '/users/login',
      errorMessage: firstInputError.msg,
      inputErrors: inputErrors.array(),
      oldInput: { email, password },
    });
  }

  try {
    // const inputErrors = [];

    const user = await User.findOne({ email });
    if (!user) inputErrors.push({ param: 'email' });

    const doMatch = await bcrypt.compare(password, user?.password || '');
    if (!doMatch) inputErrors.push({ param: 'password' });

    if (!user || !doMatch) {
      return res.status(422).render('users/login', {
        pageTitle: 'Login',
        path: '/users/login',
        errorMessage: 'Invalid email or password',
        inputErrors,
        oldInput: { email, password },
      });
    }

    return 0;

    // req.session!.user = user!
    // req.session!.isAuthenticated = true
    // req.session!.save(error => {
    //   if (error) throw 'Failed to create session in the database'
    //   res.redirect('/')
    // })
  } catch (error) {
    const operationError = new Error(error);
    operationError.httpStatusCode = 500;
    return next(operationError);
  }
};
