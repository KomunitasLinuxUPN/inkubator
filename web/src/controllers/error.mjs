export const get404 = (_req, res) => {
  res.status(404).render('404', {
    pageTitle: 'Page Not Found',
    path: '/404',
  });
};

// eslint-disable-next-line no-unused-vars
export const get500 = (err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).render('500', {
    pageTitle: 'Error',
    path: '/500',
    statusCode,
    message: err.message,
    data: err.inputErrors,
  });
};
