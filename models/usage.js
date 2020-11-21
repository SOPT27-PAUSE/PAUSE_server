const { User } = require('../models');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Usage', {
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        setTime: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        useTime: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        UserId: {
            type: DataTypes.INTEGER,
            reference: {
                model: User,
                key: 'id',
            }
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    })
}