import { conn } from '../database';

export const checkEmail = async (req, res, next) => {
    const { email } = req.body;

    const result = await conn
        .request()
        .input('email', email)
        .query(`SELECT email FROM USERS WHERE email = @email`);
    if (result.recordset.length > 0) {
        return res.status(500).json({
            message: 'Error occured',
            error: 'This email is already taken.'
        });
    }
    next();
};
