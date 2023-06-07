const Sequelize = require("sequelize");
const path = require("path");
const env = process.env.NODE_ENV || "development";
const Olle = require("./olle");
const Member = require("./member");
const Apply = require("./apply");

const config = require(path.join(__dirname, "..", "config", "database.js"))[
  env
];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {
  sequelize,
  Sequelize,
  Olle: Olle(sequelize, Sequelize),
  Member: Member(sequelize, Sequelize),
  Apply: Apply(sequelize, Sequelize),
};

db.Member.hasMany(db.Olle, {
  foreignKey: "member_id",
});
db.Olle.belongsTo(db.Member, {
  foreignKey: "member_id",
  as: "olle_writer",
});

db.Member.hasMany(db.Apply, {
  foreignKey: "member_id",
});
db.Apply.belongsTo(db.Member, {
  foreignKey: "member_id",
  as: "apply_writer",
});

db.Olle.hasMany(db.Apply, {
  foreignKey: "olle_id",
  onDelete: "cascade",
});
db.Apply.belongsTo(db.Olle, {
  foreignKey: "olle_id",
  as: "applied_olle",
});

module.exports = db;
