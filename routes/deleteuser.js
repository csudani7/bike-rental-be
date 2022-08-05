const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bikes-rental-a4d84-default-rtdb.firebaseio.com",
});
router.get("/", (req, res, next) => {
  console.log(req.body);
  if (!req.query.uid) {
    return res.status(404).send("Invalid route");
  }
  admin
    .auth()
    .deleteUser(req.query.uid)
    .then(() => {
      res.status(200).send("User Deleted From Firebase Auth");
    })
    .catch(function (error) {
      res.status(200).send(error)
    });
});

module.exports = router;
