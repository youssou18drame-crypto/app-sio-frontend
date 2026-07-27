const prisma = require('../lib/prisma');
const { hashPassword } = require('../lib/argon2');

module.exports = async (req, res) => {

    const { token, password } = req.body;

    const user = await prisma.user.findFirst({
        where: {
            resetToken: token
        }
    });

    if (!user) {
        return res.status(404).json({
            error: true,
            message: 'Token invalide'
        });
    }

    const hashedPassword = await hashPassword(password);

    await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            password: hashedPassword,
            resetToken: null
        }
    });

    return res.status(200).json({
        error: false,
        message: 'Mot de passe modifié'
    });
};