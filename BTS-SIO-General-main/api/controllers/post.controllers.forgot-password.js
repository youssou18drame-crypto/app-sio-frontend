const crypto = require('crypto');
const prisma = require('../lib/prisma');

module.exports = async (req, res) => {

    const { email } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        return res.status(404).json({
            error: true,
            message: 'Utilisateur introuvable'
        });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');

    await prisma.user.update({
        where: {
            email
        },
        data: {
            resetToken
        }
    });

    return res.status(200).json({
        error: false,
        message: 'Token généré',
        resetToken
    });
};