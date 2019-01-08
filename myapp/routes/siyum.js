"use strict";
const express = require("express");
const siyumModel = require("../models/siyum.js");
// const masechtosModel = require("../models/masechtos_mishnayos.js");
const router = express.Router();

router.get("/:Id", (req, res) => {
  siyumModel.helpers
    .getSiyumByID(req.params.Id)
    .then(response => {
      if (!response) {
        throw new Error("siyum not found");
      }
      // masechtosModel.helpers.getMasechtos().then(rese => {
      res.send({ siyumByID: response });
      // });
    })
    .catch(error => {
      if (error) {
        res.status(404).json({ status: "404", error: error.message });
      }
    });
});
router.post("/newsiyum", (req, res) => {
  siyumModel.helpers
    .createSiyum(req.body)
    .then(response => {
      res.send(response);
    })
    .catch(error => {
      if (error) {
        // res.status(400).json({ status: "404", error: error.message });
        res.send(error);
      }
    });
});
// router.put("/:Id", (req, res) => {
//   siyumModel.helpers
//     .updateSiyemById(req.body, req.params.Id)
//     .then(response => {
//       res.send(response);
//     })
//     .catch(error => {
//       if (error) {
//         res.status(400).json({ status: "404", error: error.message });
//       }
//     });
// });
// router.delete("/:Id", (req, res) => {
//   siyumModel.helpers
//     .deleteSiyemById(req.params.Id)
//     .then(status => {
//       if (!status) {
//         throw new Error("siyum not found");
//       }
//       console.log(status);
//       res.send("deleted");
//     })
//     .catch(error => {
//       if (error) {
//         res.status(404).json({ status: "404", error: error.message });
//       }
//     });
// });

module.exports = router;
