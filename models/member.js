module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define(
    "member",
    {
      member_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      profile_image_url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      age_range: {
        type: DataTypes.INTEGER,
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
