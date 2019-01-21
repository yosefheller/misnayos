"use strict";
const sequelize = require("./db_connection.js");
const DataTypes = sequelize.Sequelize;
const siyumModel = require("../models/siyumem.js");
const masechtosModel = require("../models/masechtos_mishnayos");
const def = sequelize.define(
  "masechtos_learned",
  {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    learner_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: "mishnayos_learners",
        key: "id"
      }
    },
    siyum_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: "siyumem",
        key: "id"
      }
    },
    masechto_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: "masechtos_mishnayos",
        key: "id"
      }
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    tableName: "masechtos_learned",
    learnerId: "learner_id",
    siyumId: "siyum_id",
    masechtoId: "masechto_id",

    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    timestamps: true,
    paranoid: true,
    defaultScope: {
      attributes: {
        exclude: ["created_at", "updated_at", "deleted_at"]
      }
    }
  }
);
def.belongsTo(siyumModel, { foreignKey: "siyum_id" });
def.belongsTo(masechtosModel, { foreignKey: "masechto_id" });
// const getMasechtos = () =>
//   def.findAll().then(masechtos => {
//     return masechtos;
//   });
// const getMasechtosByUserID = id => {
//   return def.findAll({
//     where: {
//       learner_id: id
//     },

//     include: {
//       model: siyumModel
//     }
//   });
// };
const createLearnMasechto = body =>
  def.bulkCreate(body).then(res => {
    return res;
  });

// const updateMasechtoId = (siyum, id) => {
//   return def.update(siyum, {
//     where: { id: id }
//   });
// };
const deleteMasechtoById = id => {
  return def.destroy({
    where: { id: id }
  });
};
const setBoolCompletedMasechto = id => {
  return def.update(
    {
      completed: true
    },
    { where: { id: id } }
  );
};
const getMasechtosByUserID2 = id => {
  return sequelize.query(
    "SELECT masechtos_learned.learner_id,masechtos_learned.id,siyumem.id AS siyumId, masechtos_learned.completed,  completed,siyumem.siyum_name,siyumem.neshama,siyumem.siyum_date,masechtos_mishnayos.masechto_name FROM masechtos_learned INNER JOIN siyumem  ON masechtos_learned.siyum_id = siyumem.id INNER JOIN masechtos_mishnayos ON masechtos_learned.masechto_id = masechtos_mishnayos.id WHERE masechtos_learned.learner_id = :learner_id AND masechtos_learned.deleted_at IS NULL",
    { replacements: { learner_id: id }, type: sequelize.QueryTypes.SELECT },
    { raw: false }
  );
};

module.exports = def;
module.exports.helpers = {
  // getMasechtos,
  getMasechtosByUserID2,
  createLearnMasechto,
  // updateMasechtoId,
  deleteMasechtoById,
  setBoolCompletedMasechto
};
