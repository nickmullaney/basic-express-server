`use strict`;

module.exports = (req, res, next) => {
  // Logs the req and res
  console.log(`${req.method}: ${req.path}`);
  next();
};