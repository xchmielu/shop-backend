import {
    getAllUsers,
    addUser,
    getUserById,
    changePassword,
    deleteUserById,
    secret
} from '../controllers/users.controllers';

const express = require('express');
const passport = require('passport');

// const passportConf = require('../passport');

const { validateBody, authSchema } = require('../helpers/routeHelper');

const { checkEmail } = require('../helpers/checkExistingEmail');

const router = express.Router();

router.get('/', getAllUsers);

router.post('/', checkEmail, validateBody(authSchema), addUser);

router.get('/secret', passport.authenticate('jwt', { session: false }), secret);

// :id Routes

router.get('/:id', getUserById);

router.patch('/:id', changePassword);

router.delete('/:id', deleteUserById);

export default router;
