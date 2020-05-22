const Sequelize = require('sequelize');
const db = require('../dbConfig');

const Book = db.define('book' , {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    },
    genre: {
        type: Sequelize.STRING
    },    
    year: {
        type: Sequelize.NUMBER
    }
})
module.exports = Book;