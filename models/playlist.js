module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Playlist', {
        url: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        playtime: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        freezeTableName: true,
        timetables: false,
    })
}