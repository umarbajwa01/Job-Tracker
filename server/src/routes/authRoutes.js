const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);

// Temporary test route — proves the middleware works. We'll remove this later.
router.get('/test-protected', protect, (req, res) => {
  res.json({ success: true, message: `You are authenticated as user ${req.userId}` });
});

module.exports = router;