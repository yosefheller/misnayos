"use strict";
var express = require("express");
var masechtosModel = require("../models/masechtos_learned.js");
var router = express.Router();

// router.get("/", (req, res) => {
//   masechtosModel.helpers.getMasechtos().then(response => {
//     console.log(response);
//     res.send(response);
//   });
// });
router.get("/:Id", (req, res) => {
  masechtosModel.helpers
    .getMasechtosByUserID2(req.params.Id)
    .then(response => {
      if (!response) {
        throw new Error("masechto not found");
      }
      res.send(response);
    })
    .catch(error => {
      if (error) {
        res.status(404).json({ status: "404", error: error.message });
      }
    });
});
router.post("/newmasechto", (req, res) => {
  masechtosModel.helpers
    .createLearnMasechto(req.body)
    .then(response => {
      res.send(response);
    })
    .catch(error => {
      if (error) {
        res.status(400).json({ status: "404", error: error.message });
      }
    });
});
// router.put("/:Id", (req, res) => {
//   masechtosModel.helpers
//     .updateMasechtoId(req.body, req.params.Id)
//     .then(response => {
//       res.send(response);
//     })
//     .catch(error => {
//       if (error) {
//         res.status(400).json({ status: "404", error: error.message });
//       }
//     });
// });
router.put("/:Id", (req, res) => {
  masechtosModel.helpers
    .setBoolCompletedMasechto(req.params.Id)
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
  masechtosModel.helpers
    .deleteMasechtoById(req.params.Id)
    .then(status => {
      if (!status) {
        throw new Error("siyum not found");
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
