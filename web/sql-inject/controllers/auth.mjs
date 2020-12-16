export const getSignup = (req, res) => {
  const [message] = req.flash('error');
  res.render('auth/signup', {
    pageTitle: 'Signup',
    path: '/signup',
    errorMessage: message || 'Lorem ipsum',
    inputErrors: [],
    oldInput: { email: '', password: '' },
  });
};

export const postSignup = (_, res) => {
  res.status(200).json({ message: 'Hello World' });
};
