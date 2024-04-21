const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  };
  
  module.exports = withAuth;
  