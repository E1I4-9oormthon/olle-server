module.exports = (sequelize, DataTypes) => {
  const Olle = sequelize.define(
    "olle",
    {
      olle_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      prefer_gender: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      course: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      contact: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "olles",
      deletedAt: "deletedAt",
      paranoid: true,
      timestamps: true,
    }
  );
  return Olle;
};
