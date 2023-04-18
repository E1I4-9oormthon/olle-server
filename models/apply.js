module.exports = (sequelize, DataTypes) => {
  const Apply = sequelize.define(
    "apply",
    {
      apply_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      contents: {
        type: DataTypes.TEXT,
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
