const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const chats = sequelize.define('chats', {
    id: {
        field: 'id',
        type: DataTypes.BIGINT,
        primaryKey: true, 
        autoIncrement: true
    },
    users: {
        field: 'users',
        type: DataTypes.TEXT,
        allowNull: false,
    },
    questions: {
        field: 'questions',
        type: DataTypes.TEXT,
        allowNull: false,
    },
    answers: {
        field: 'answers',
        type: DataTypes.TEXT,
        allowNull: false,
    }
});

module.exports = { chats };