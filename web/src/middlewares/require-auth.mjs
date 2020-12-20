export default (req, _, next) => {
  if (!req.session.isAuthenticated) {
    const operationError = new Error('Access denied');
    operationError.statusCode = 403;
    next(operationError);
  }
  next();
};
