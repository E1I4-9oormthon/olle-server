module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define(
    "member",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      nickname: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      profile_image: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      age_range: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      prefer_travel: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "members",
      deletedAt: "deletedAt",
      paranoid: true,
      timestamps: true,
    }
  );
  return Member;
};
