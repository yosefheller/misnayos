"use strict";
const sequelize = require("./db_connection.js");
const DataTypes = sequelize.Sequelize;
const masechtosLearnedModel = require("../models/masechtos_learned.js");
// const masechtosModel = require("../models/masechtos_mishnayos.js");
const usersModel = require("../models/users.js");
const def = sequelize.define(
  "siyumem",
  {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    creator_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: "users",
        key: "id"
      }
    },

    siyum_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    neshama: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    siyum_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true
      }
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
    },
    password: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    }
  },

  {
    tableName: "siyumem",
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
def.hasMany(masechtosLearnedModel, { foreignKey: "siyum_id" });
masechtosLearnedModel.belongsTo(usersModel, { foreignKey: "learner_id" });

const getSiyumByID = id => {
  return def.findById(id);
};
const createSiyum = body => {
  return def.create(body).then(res => {
    return res;
  });
};

// const updateSiyemById = (siyum, id) => {
//   return def.update(siyum, {
//     where: { id: id }
//   });
// };
// const deleteSiyemById = id => {
//   return def.destroy({
//     where: { id: id }
//   });
// };
module.exports = def;
module.exports.helpers = {
  getSiyumByID,
  createSiyum
  // updateSiyemById,
  // deleteSiyemById
};
