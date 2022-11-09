const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");
let i = 1;
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bikes-rental-a4d84-default-rtdb.firebaseio.com",
});

router.get("/", (req, res) => {
  if (!req.query.uid) {
    return res.status(404).send("Invalid route");
  }
  if (req.query.uid) {
    admin
      .auth()
      .deleteUser(req.query.uid)
      .then(() => {
        res.status(200).send("User Deleted From Firebase Auth");
      })
      .catch(function (error) {
        res.status(501).send(error);
      });
  }
});

router.get("/process", (req, res) => {
  if (i % 5 === 0) {
    res.send({
      statusCode: "200",
      statusMessage: "Processing Started(or In Progress)",
    });
  } else {
    res.send({
      statusCode: "102",
      statusMessage: `Processing Completed successfully ${String((i % 5) - 1 * 25)}`
    });
  }
  i++
});
module.exports = router;
