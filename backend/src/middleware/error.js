export const errorHandler = (err, req, res, next) => {
  console.error('[error]', err);
  if (res.headersSent) return next(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'internal error' });
};
