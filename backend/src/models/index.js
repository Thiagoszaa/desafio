const sequelize = require('../config/sequelize')
const Sequelize = require('sequelize')

const Apartamento = require('./apartamento')

const apartamento = Apartamento(sequelize, Sequelize.DataTypes)

const db = {
    apartamento,
    sequelize,
}

module.exports = db