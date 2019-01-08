"use strict";
const sequelize = require("./db_connection.js");
const DataTypes = sequelize.Sequelize;
const masechtosLearnedModel = require("../models/masechtos_learned.js");
const siyumModel = require("../models/siyum.js");
const def = sequelize.define(
  "masechtos_mishnayos",
  {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    masechto_name: {
      type: DataTypes.STRING(25),
      allowNull: false
    }
  },
  {
    tableName: "masechtos_mishnayos",
    masechtoName: "masechto_name",
    timestamps: false,
    paranoid: true
  }
);
// const getMasechtos = () =>
//   def.findAll().then(masechtos => {
//     return masechtos;
//   });
// const getMasechtoByID = id =>
//   def.findById(id).then(Masechto => {
//     return Masechto;
//   });
// def.hasMany(masechtosLearnedModel, { foreignKey: "siyum_id" });
// masechtosLearnedModel.belongsTo(masechtosModel, { foreignKey: "masechto_id" });

const getSiyumINFOByID = id => {
  return sequelize.query(
    "SELECT masechtos_mishnayos.masechto_name,masechtos_mishnayos.id,(SELECT users.user_name FROM masechtos_learned  INNER JOIN users  ON masechtos_learned.learner_id = users.id WHERE   masechtos_learned.masechto_id = masechtos_mishnayos.id AND masechtos_learned.deleted_at IS NULL AND masechtos_learned.siyum_id = :siyum_id LIMIT 1 ) AS LearnerName ,(SELECT masechtos_learned.completed FROM masechtos_learned  INNER JOIN users  ON masechtos_learned.learner_id = users.id WHERE   masechtos_learned.masechto_id = masechtos_mishnayos.id AND masechtos_learned.deleted_at IS NULL AND masechtos_learned.siyum_id = :siyum_id LIMIT 1 ) AS completed FROM masechtos_mishnayos WHERE EXISTS (SELECT siyumem.id FROM siyumem WHERE siyumem.id= :siyum_id);",
    { replacements: { siyum_id: id }, type: sequelize.QueryTypes.SELECT },
    { raw: false }
  );
};

module.exports = def;
module.exports.helpers = {
  // getMasechtos,
  // getMasechtoByID,
  getSiyumINFOByID
};
