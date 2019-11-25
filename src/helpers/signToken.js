import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const signToken = user =>
    JWT.sign(
        {
            iss: 'EcommerceBackend',
            sub: user.id_user,
            iat: new Date().getTime(),
            exp: new Date().setTime(new Date().getDate() + 1)
        },
        process.env.JWT_SECRET
    );
