const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d' // Default to 30 days if JWT_EXPIRES_IN is not set
  });
};

module.exports = generateToken;