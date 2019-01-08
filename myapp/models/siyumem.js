"use strict";
const sequelize = require("./db_connection.js");
const DataTypes = sequelize.Sequelize;
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
      allowNull: false
    },
    neshama: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    siyum_name: {
      type: DataTypes.STRING(255),
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
// const getSiyumem = () =>
//   def.findAll().then(siyumem => {
//     return siyumem;
//   });
// const getSiyumByID = id =>
//   def.findById(id).then(siyum => {
//     return siyum;
//   });
const getSiyumByCreatorID = id =>
  def
    .findAll({
      where: {
        creator_id: id
      }
    })
    .then(siyum => {
      return siyum;
    });
// const createSiyum = body =>
//   def.create(body).then(res => {
//     return res;
//   });
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
  // getSiyumem,
  // getSiyumByID,
  getSiyumByCreatorID
  // createSiyum,
  // updateSiyemById,
  // deleteSiyemById
};
