const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const JWT_SEC = 'CyberTrosGotBlackFlag';
const fetchUser = require('../middleware/fetchUser');
//ROUTE 1: crate a user using : POST "api/auth/createuser". No login Req.
router.post(
  '/createuser',
  [
    body('email', 'Enter a Valid Email').isEmail(),
    body('name', 'Enter a Valid Name').isLength({ min: 3 }),
    body('password', 'Enter a Valid Password').isLength({ min: 3 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    // if there are errors return bad request and errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      // check user with same email already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success,
          error: 'sorry a user with this email is already exists ',
        });
      }
      const salt = await bcrypt.genSalt(10);
      secPassword = await bcrypt.hash(req.body.password, salt);
      //create new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SEC);
      success = true;
      res.json({ success, authToken });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error ' });
    }
  }
);

// ROUTE 2: crate a user using : POST "api/auth/login". No login Req.
router.post(
  '/login',
  [
    body('email', 'Enter a Valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    // if there are errors return bad request and errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: 'Please try to login with correct information' });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({
          success,
          error: 'Please try to login with correct credentials',
        });
      }

      const payLoad = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(payLoad, JWT_SEC);
      //res.json({ authToken });
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error ' });
    }
  }
);

//ROUTE 3: Get User using : POST "api/auth/getuser".  login Req.
router.post('/getuser', fetchUser, async (req, res) => {
  try {
    userID = req.user.id;
    const user = await User.findById(userID).select('-password');
    res.send(user);
  } catch (error) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error ' });
  }
});
module.exports = router;
