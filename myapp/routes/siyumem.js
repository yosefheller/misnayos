"use strict";
const express = require("express");
const siyumemModel = require("../models/siyumem.js");
const router = express.Router();

// router.get("/", (req, res) => {
//   siyumemModel.helpers.getSiyumem().then(response => {
//     console.log(response);
//     res.send(response);
//   });
// });
router.get("/:Id", (req, res) => {
  siyumemModel.helpers
    .getSiyumByCreatorID(req.params.Id)
    .then(response => {
      if (!response) {
        throw new Error("siyum not found");
      }
      res.send(response);
    })
    .catch(error => {
      if (error) {
        res.status(404).json({ status: "404", error: error.message });
      }
    });
});
// router.post("/newsiyum", (req, res) => {
//   siyumemModel.helpers
//     .createSiyum(req.body)
//     .then(response => {
//       res.send(response);
//     })
//     .catch(error => {
//       if (error) {
//         res.status(400).json({ status: "404", error: error.message });
//       }
//     });
// });
// router.put("/:Id", (req, res) => {
//   siyumemModel.helpers
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
//   siyumemModel.helpers
//     .deleteSiyemById(req.params.Id)
//     .then(status => {
//       if (!status) {
//         throw new Error("siyum not found");
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

module.exports = router;
