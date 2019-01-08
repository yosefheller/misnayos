"use strict";
var express = require("express");
var masechtosModel = require("../models/masechtos_mishnayos.js");
var router = express.Router();

router.get("/:Id", (req, res) => {
  masechtosModel.helpers.getSiyumINFOByID(req.params.Id).then(response => {
    res.send(response);
  });
});
// router.get("/:Id", (req, res) => {
//   masechtosModel.helpers
//     .getMasechtoByID(req.params.Id)
//     .then(response => {
//       if (!response) {
//         throw new Error("masechto not found");
//       }
//       console.log(response);
//       res.send(response);
//     })
//     .catch(error => {
//       if (error) {
//         res.status(404).json({ status: "404", error: error.message });
//       }
//     });
// });

module.exports = router;
