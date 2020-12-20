import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';

import User from '../models/User.mjs';

export const getIndex = async (_req, res, next) => {
  try {
    const [users] = await User.fetchAll();
    res.render('users/index', {
      users,
      pageTitle: 'All Users',
      path: '/users',
    });
  } catch (error) {
    next(error);
  }
};

export const getSignup = (req, res) => {
  const [message] = req.flash('error');
  res.render('users/signup', {
    pageTitle: 'Signup',
    path: '/users/signup',
    errorMessage: message,
    inputErrors: [],
    oldInput: {
      name: '',
      email: '',
      password: '',
      role: 'user',
    },
  });
};

export const postSignup = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const inputErrors = validationResult(req);
  const [firstInputError] = inputErrors.array();

  if (!inputErrors.isEmpty()) {
    return res.status(422).render('users/signup', {
      pageTitle: 'Signup',
      path: '/users/signup',
      errorMessage: firstInputError.msg,
      inputErrors: inputErrors.array(),
      oldInput: { name, email, password, role },
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User(null, name, email, hashedPassword, role);
    await user.save();
    res.status(200).redirect('/users/login');
  } catch (error) {
    const operationError = new Error(error);
    operationError.statusCode = 500;
    next(operationError);
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
    const inputErrors = [];

    const [[user]] = await User.findByEmail(email);
    if (!user) inputErrors.push({ param: 'email' });

    const doMatch = await bcrypt.compare(password, user?.password_hash || '');
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

    req.session.isAuthenticated = true;
    req.session.user = {
      name: user.name,
      email: user.email,
      role: user.role,
    };
    req.session.save((error) => {
      if (error) throw new Error('Failed to create session in the database');
      res.redirect('/');
    });
  } catch (error) {
    const operationError = new Error(error);
    operationError.statusCode = 500;
    next(operationError);
  }
};

export const postLogout = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    }
    res.redirect('/');
  });
};

export const getProfile = async (req, res, next) => {
  try {
    res.render('users/profile', {
      pageTitle: 'My Profile',
      path: '/users/profile',
      user: req.session.user,
    });
  } catch (error) {
    const operationError = new Error(error);
    operationError.statusCode = 500;
    next(operationError);
  }
};
