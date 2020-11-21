module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        loginId: {
            type: DataTypes.STRING(30),
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        salt: {
            type: DataTypes.STRING(200),
            allowNull: false,
        }
    }, {
        freezeTableName: true,
        timestamps: false,
    });
}