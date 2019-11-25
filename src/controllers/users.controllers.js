import bcrypt from 'bcryptjs';
import { conn } from '../database';
import { signToken } from '../helpers/signToken';

export const getAllUsers = async (req, res) => {
    try {
        const result = await conn.request().query('select * from Users');

        return res.status(200).json({
            message: 'Sucessfully displayed',
            data: result.recordset
        });
    } catch (e) {
        return res.status(500).json({
            message: 'Error occured',
            error: e
        });
    }
};

export const addUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        bcrypt.genSalt(10, async (err, salt) => {
            bcrypt.hash(password, salt, async (error, hash) => {
                await conn
                    .request()
                    .input('username', username)
                    .input('password', hash)
                    .input('email', email)
                    .input('registered', 0)
                    .query(
                        `INSERT INTO USERS(username, password, email, registered ) 
                        VALUES (@username, @password, @email, @registered)`
                    );
            });
        });
        const result = await conn
            .request()
            .input('email', email)
            .query('SELECT * FROM USERS WHERE email = @email');

        const token = signToken(result.recordsets);
        return res.status(201).json({
            message: 'Sucessfully created',
            data: result.recordset,
            registerurl: 'test',
            token
        });
    } catch (e) {
        return res.status(500).json({
            message: 'Error occured',
            error: e
        });
    }
};

// :id Routes

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await conn
            .request()
            .input('id', id)
            .query('select * from Users where id_user = @id');
        return res.status(200).json({
            message: `Sucessfully displayed user ${id}`,
            data: result.recordset
        });
    } catch (e) {
        return res.status(500).json({
            message: 'Error occured',
            error: e
        });
    }
};

export const changePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;
        await conn
            .request()
            .input('id', id)
            .input('password', password)
            .query('UPDATE Users SET password = @password where id_user =  @id');
        return res.status(200).json({
            message: `Sucessfully changed password for user ${id}`
        });
    } catch (e) {
        return res.status(500).json({
            message: 'Error occured',
            error: e
        });
    }
};

export const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        await conn
            .request()
            .input('id', id)
            .query('DELETE from Users where id_user = @id');
        return res.status(200).json({
            message: `Sucessfully deleted user ${id}`
        });
    } catch (e) {
        return res.status(500).json({
            message: 'Error occured',
            error: e
        });
    }
};

export const secret = (req, res) => {
    res.json({ secret: 'Yes' });
};
