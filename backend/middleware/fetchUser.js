const jwt = require('jsonwebtoken');
const JWT_SEC = 'CyberTrosGotBlackFlag';
const fetchUser = (req, res, next) => {
  // get the user from to jwt token and add id to request body
  const token = req.header('auth-token');
  if (!token) {
    return res
      .status(401)
      .json({ error: 'Please authenticate with valid token' });
  }
  try {
    const str = jwt.verify(token, JWT_SEC);
    req.user = str.user;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ errors: 'Please authenticate with valid token ' + error });
  }
};

module.exports = fetchUser;
