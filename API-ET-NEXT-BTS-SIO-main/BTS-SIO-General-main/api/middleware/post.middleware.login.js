const Middleware = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: true,
      message: "[M806] Email et mot de passe obligatoires"
    });
  }

  next();
};

module.exports = Middleware;