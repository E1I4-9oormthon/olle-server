module.exports = (sequelize, DataTypes) => {
  const Apply = sequelize.define(
    "apply",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      contents: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "applies",
      deletedAt: "deletedAt",
      paranoid: true,
      timestamps: true,
    }
  );
  return Apply;
};
