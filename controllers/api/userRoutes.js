const express = require('express');
const router = express.Router();
const { User } = require('../../models');

// Middleware
router.use((req, res, next) => {
    res.handleUnauthroized = () => res.status (400).json({ message: 'Incorrect email or password, try again'});
    res.handleBadRequerst = (err) => res.status(400).json({ error: err.message });
    next();
});

router.post('/', async (req, res) => {
    try {
      const userData = await User.create(req.body);
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    } catch (err) {
      res.handleBadRequest(err);
    }
  });
  
  router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
      if (!userData || !(await userData.checkPassword(req.body.password))) {
        res.handleUnauthorized();
        return;
      }
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'You are now logged in!' });
    } catch (err) {
      res.handleBadRequest(err);
    }
  });
  
  router.post('/logout', (req, res) => {
    if (!req.session.logged_in) {
      return res.status(404).end();
    }
    req.session.destroy(() => res.status(204).end());
  });
  
  module.exports = router;
