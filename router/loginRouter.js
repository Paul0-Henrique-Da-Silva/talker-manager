const express = require('express');

const { 
  validateEmail,
  validatePassword,
  generateToken,
  } = require('../middleware/validation/loginValitade');

const router = express.Router();
// ende point q vai ser ecaminhado para /login
router.post('/', validateEmail, validatePassword, async (_request, response) => {
    const toKen = generateToken(16);
    response.status(200).json({ token: toKen });
  });

module.exports = router;
