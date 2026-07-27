
const argon2 = require('../lib/argon2');
const prisma = require('../lib/prisma');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({
        error: true,
        message: "[M804] Email ou mot de passe incorrect"
      });
    }

    const isValid = await argon2.verifyPassword(password, user.password);
    // adapte le nom/ordre des arguments à ta vraie fonction dans lib/argon2.js

    if (!isValid) {
      return res.status(401).json({
        error: true,
        message: "[M804] Email ou mot de passe incorrect"
      });
    }

    const token = jwt.sign(
      { sub: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    return res.status(200).json({
      error: false,
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });

  } catch (error) {
    console.error('Error login:', error);

    return res.status(500).json({
      error: true,
      message: "[M805] Erreur lors de la connexion"
    });
  }
};