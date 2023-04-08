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
  foreignKey: "id",
});
db.Olle.belongsTo(db.Member, {
  foreignKey: "id",
  as: "olle_writer",
});

db.Member.hasMany(db.Apply, {
  foreignKey: "id",
});
db.Apply.belongsTo(db.Member, {
  foreignKey: "id",
  as: "apply_writer",
});

db.Olle.hasMany(db.Apply, {
  foreignKey: "id",
  onDelete: "cascade",
});
db.Apply.belongsTo(db.Olle, {
  foreignKey: "id",
  as: "applied_olle",
});

module.exports = db;
