const jwt = require('jsonwebtoken');

const secretKey = '9eyJtZXNzYWdlIjoiSldUIFJ1bGVzISIsImlhdCI6MTQ1OTQ0ODExOSwiZX'; // Cambia esto por una clave segura

module.exports = {
  generateToken: (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: '24h' });
  },
  verifyToken: (token) => {
    try {
      return jwt.verify(token, secretKey);
    } catch (err) {
      return null;
    }
  },
};