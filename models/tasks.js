const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const tasks = sequelize.define('Tasks', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unsigned: true,
        type: Sequelize.INTEGER
    },
    completed: {
        type: Sequelize.BOOLEAN
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = tasks;