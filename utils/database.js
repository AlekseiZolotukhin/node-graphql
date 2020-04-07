const Sequelize = require('sequelize');

const DB_NAME = ''; // type here database name
const DB_USER = ''; // type here database user
const DB_PASS = ''; // type here database user password
const DB_HOST = ''; // type here database host

const sequilize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'mysql'
});

module.exports = sequilize;