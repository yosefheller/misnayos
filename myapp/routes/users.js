"use strict";
const express = require("express");
const usersModel = require("../models/users.js");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator/check");
const passport = require("passport");

router.get("/", (req, res) => {
  usersModel.helpers.getUsers().then(response => {
    res.send(response);
  });
});
router.get("/:Id", (req, res) => {
  usersModel.helpers
    .getUserByID(req.params.Id)
    .then(response => {
      if (!response) {
        throw new Error("user not found");
      }
      // console.log("response");
      res.send(response);
    })
    .catch(error => {
      if (error) {
        res.status(404).json({ status: "404", error: error.message });
      }
    });
});

router.post(
  "/newuser",
  [
    check("user_name")
      .isLength({ min: 1 })
      .trim()
      .withMessage("Name required"),
    check("email")
      .isEmail()
      .trim()
      .withMessage("Email required"),
    check("password")
      .isLength({ min: 4 })
      .trim()
      .withMessage("Password required"),
    check("password").custom((value, { req, loc, path }) => {
      if (value !== req.body.password2) {
        // throw error if passwords do not match
        throw new Error("Passwords do not match");
      } else {
        return value;
      }
    })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let newUser = {
      user_name: req.body.user_name,
      email: req.body.email,
      password: req.body.password
    };

    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(newUser.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
        }
        newUser.password = hash;
        usersModel.helpers
          .createUser(newUser)
          .then(response => {
            res.send(response);
          })
          .catch(error => {
            if (error) {
              res.status(400).json({ status: "404", error: error.message });
            }
          });
      });
    });
  }
);
// router.post("/login", function(req, res) {
//   passport.authenticate("local", {
//     successRedirect: "/users/" + req.user.id,
//     failureRedirect: "/users/11",
//     failureFlash: true
//   })(req, res);
// });
router.post("/login", passport.authenticate("local"), function(req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.

  res.redirect("/users/" + req.user.id);
});

// router.post("/login", (req, res) =>
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/masechtos_mishnayos/1"
//   })(req, res)
// );
// router.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/login"
//   })
// );
// router.post(
//   "/login",
//   passport.authenticate("local", { failureRedirect: "/masechtos_mishnayos/" }),
//   function(req, res) {
//     res.redirect("/masechtos_mishnayos/1");
//   }
// );

// let query = { user_name: "iuhiu" };
// router.post("/login", (req, res) => {
//   usersModel.helpers
//     .getUser({ where: query })
//     .then(status => {
//       if (!status) {
//         throw new Error("user not found");
//       }
//       console.log(status);
//       res.status(200).json({ status: "200", message: "successfully deleted" });
//     })
//     .catch(error => {
//       if (error) {
//         res.status(404).json({ status: "404", error: error.message });
//       }
//     });
// });
router.put("/:Id", (req, res) => {
  usersModel.helpers
    .updateUserById(req.body, req.params.Id)
    .then(response => {
      res.send(response);
    })
    .catch(error => {
      if (error) {
        res.status(400).json({ status: "404", error: error.message });
      }
    });
});
router.delete("/:Id", (req, res) => {
  usersModel.helpers
    .deleteUserById(req.params.Id)
    .then(status => {
      if (!status) {
        throw new Error("user not found");
      }
      console.log(status);
      res.status(200).json({ status: "200", message: "successfully deleted" });
    })
    .catch(error => {
      if (error) {
        res.status(404).json({ status: "404", error: error.message });
      }
    });
});

module.exports = router;
