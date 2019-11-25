import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
// import { Strategy as LocalStrategy } from 'passport-local';
import dotenv from 'dotenv';
import { conn } from './database';

dotenv.config();

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromHeader('authorization'),
            secretOrKey: process.env.JWT_SECRET
        },
        async (payload, done) => {
            try {
                const result = await conn
                    .request()
                    .input('id', payload.sub)
                    .query('SELECT * FROM USERS WHERE id_user = @id');
                if (!result.recordset.length) {
                    return done(null, false);
                }
                return done(null, result.recordset);
            } catch (e) {
                return done(e, false);
            }
        }
    )
);
