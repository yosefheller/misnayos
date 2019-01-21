"use strict";
const sequelize = require("./db_connection.js");
const DataTypes = sequelize.Sequelize;
const Op = sequelize.Op;
const nodemailer = require("nodemailer");

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
const dateFormater = oldDate => {
  let newDate = new Date(oldDate);
  return newDate.toDateString();
};
const sendEmails = body =>
  def
    .findAll({
      attributes: ["email"],
      where: {
        id: body.learnersId
      }
    })
    .then(res => {
      var arr1 = JSON.parse(JSON.stringify(res));
      var arr2 = arr1.map(function(item) {
        return item["email"];
      });
      console.log(arr2);
      // async function main() {
      const output = `
    <h3>Reminder to learn...</h3>
    <p>  
     Hi this is friendly reminder to learn and finish .. the masechtos you took in memory of  ${
       body.siyum.neshama
     } by${dateFormater(
        body.siyum.siyum_date
      )}  for more info go to http://localhost:3000/myMasechtos
     
    </p>
   
  `;
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      // let account = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
      // let transporter = nodemailer.createTransport({
      //   host: "smtp.ethereal.email",
      //   port: 587,
      //   secure: false, // true for 465, false for other ports
      //   auth: {
      //     user: account.user, // generated ethereal user
      //     pass: account.pass // generated ethereal password
      //   }
      // });
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "yoursiyum@gmail.com",
          pass: "npgs3410"
        }
      });
      const mailOptions = {
        from: "yoursiyum@gmail.com", // sender address
        to: arr2.toString(), // list of receivers
        subject: "Reminder to learn..", // Subject line
        html: output // plain text body
      };
      // setup email data with unicode symbols
      // let mailOptions = {
      //   from: "hellerfraidy@gmail.com", // sender address
      //   to: arr2.toString(), // list of receivers
      //   subject: "Hello ✔", // Subject line
      //   text: "Hello world?", // plain text body
      //   html: output // html body
      // };

      // send mail with defined transport object
      // let info = await transporter.sendMail(mailOptions);

      // console.log("Message sent: %s", info.messageId);
      // // Preview only available when sending through an Ethereal account
      // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      transporter.sendMail(mailOptions, function(err, info) {
        if (err) console.log(err);
        else console.log(info);
      });
      // }

      // main().catch(console.error);
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
  sendEmails,
  // updateUserById,
  // deleteUserById,
  getUser
};
