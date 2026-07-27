const sendEmail = require('../lib/nodemailer')
const argon2 = require('../lib/argon2')
const prisma = require('../lib/prisma')

module.exports = async (req, res) => {

  const { name, email, password, confirmPassword } = req.body

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({
      error: true,
      message: 'Tous les champs sont obligatoires'
    })
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      error: true,
      message: 'Les mots de passe ne correspondent pas'
    })
  }

  try {

    const existingUser = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (existingUser) {
      return res.status(409).json({
        error: true,
        message: 'Cet email est déjà utilisé'
      })
    }

    const hash = await argon2.hashPassword(password)

    await prisma.user.create({
      data: {
        name,
        email,
        password: hash
      }
    })

    const subject = 'Bienvenue sur notre site !'

    const text = `Bonjour ${name},

Merci de vous être inscrit sur notre site.
Votre compte a été créé avec succès.`

    await sendEmail(email, subject, text)

    return res.status(201).json({
      error: false,
      message: 'Utilisateur créé avec succès'
    })

  } catch (error) {

    console.error(error)

    return res.status(500).json({
      error: true,
      message: 'Erreur serveur'
    })

  }

}