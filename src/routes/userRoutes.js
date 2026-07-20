const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getUserPreferences, 
  updateUserPreferences 
} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id/preferences', getUserPreferences);
router.put('/:id/preferences', updateUserPreferences);

module.exports = router;