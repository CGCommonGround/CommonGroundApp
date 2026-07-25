const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getUserPreferences, 
  updateUserPreferences,
  getUserProfile,
  getUserGroups

} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id/preferences', getUserPreferences);
router.put('/:id/preferences', updateUserPreferences);
router.get('/:id/profile', getUserProfile);
router.get('/:id/groups', getUserGroups);

module.exports = router;