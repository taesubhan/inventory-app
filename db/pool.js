const {Pool} = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = new Pool({
    host: isProduction ? process.env.PROD_DATABASE_HOST : process.env.DEV_DATABASE_HOST,
    user: isProduction ? process.env.PROD_DATABASE_USER : process.env.DEV_DATABASE_USER,
    database: isProduction ? process.env.PROD_DATABASE_NAME : process.env.DEV_DATABASE_NAME,
    password: isProduction ? process.env.PROD_DATABASE_PASSWORD : process.env.DEV_DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    ssl: isProduction ? { rejectUnauthorized: false } : false
})