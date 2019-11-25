import sql from 'mssql';

import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    server: process.env.DB_URL,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: 1433,
    options: {
        encrypt: true
    }
};

export const conn = new sql.ConnectionPool(dbConfig);

conn.connect().then(() => {
    console.log('Connected');
});
