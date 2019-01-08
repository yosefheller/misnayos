"use strict";
const sequelize = require("./db_connection.js");
const DataTypes = sequelize.Sequelize;
const def = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
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
    tableName: "users",
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
// const getUsers = () =>
//   def.findAll().then(users => {
//     return users;
//   });
const getUser = user =>
  def.findOne(user).then(users => {
    // console.log("hi");
    // console.log(users);
    return users;
  });
const getUserByID = id =>
  def.findById(id).then(user => {
    // def.findOne({ where: { email: id } }).then(user => {
    return user;
  });
const createUser = body =>
  def.create(body).then(res => {
    return res;
  });
// const updateUserById = (user, id) => {
//   return def.update(user, {
//     where: { id: id }
//   });
// };
// const deleteUserById = id => {
//   return def.destroy({
//     where: { id: id }
//   });
// };
module.exports = def;
module.exports.helpers = {
  // getUsers,
  getUserByID,
  createUser,
  // updateUserById,
  // deleteUserById,
  getUser
};
