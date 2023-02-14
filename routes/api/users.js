// routes/api/users.js

const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
// require the authorization middleware function
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// POST /api/users
// Sign Up (create)
router.post('/', usersCtrl.create);

// POST /api/users/login
// Log In
router.post('/login', usersCtrl.logIn);

// GET /api/users/checkToken
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);
module.exports = router;
