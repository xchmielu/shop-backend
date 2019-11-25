import bcrypt from 'bcryptjs';

export const hasing = password => {
    const salt = bcrypt.genSalt(10);

    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
        if (err) {
            console.error(err);
        }
    });
};
