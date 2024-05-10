const express = require('express');
const router = express.Router();
const { User } = require('../models');

// Middleware for errors
const handleErrors = (res, status, message) => res.status(status).json({ message });

// Middleware for setting session properties
const setSession = (req, user) => {
    req.session.user_id = user.id;
    req.session.logged_in = true;
  };
  
// Handle root URL
router.get('/', (req, res) => {
  res.send('Welcome to the home page!');
});

  router.post('/', async (req, res) => {
    try {
      const userData = await User.create(req.body);
      setSession(req, userData);
      res.status(200).json(userData);
    } catch (err) {
      handleErrors(res, 400, err.message);
    }
  });
  
  router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
      if (!userData || !(await userData.checkPassword(req.body.password))) {
        handleErrors(res, 400, 'Incorrect email or password, please try again');
        return;
      }
      setSession(req, userData);
      res.json({ user: userData, message: 'You are now logged in!' });
    } catch (err) {
      handleErrors(res, 400, err.message);
    }
  });
  
  router.post('/logout', (req, res) => {
    if (!req.session.logged_in) {
      return res.status(404).end();
    }
    req.session.destroy(() => res.status(204).end());
  });
  
  module.exports = router;