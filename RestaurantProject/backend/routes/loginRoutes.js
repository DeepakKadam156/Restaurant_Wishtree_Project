const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../db/passKeys");
const passport = require("passport");
const validateRegister = require("../loginValidation/register");
const validateLogin = require("../loginValidation/login");
const Admin = require("../models/admin");

//login and register routes and their tasks

router.post("/register", (req, res) => {
  const { err, isValid } = validateRegister(req.body);
  if (!isValid) {
    return res.status(400).json(err);
  }

  Admin.findOne({ email: req.body.email }).then((admin) => {
    if (admin) {
      return res.status(400).json({ email: "Email already exists." });
    } else {
      const newAdmin = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
          if (err) throw err;
          newAdmin.password = hash;
          newAdmin
            .save()
            .then((admin) => res.json(admin))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { err, isValid } = validateLogin(req.body);

  if (!isValid) {
    return res.status(400).json(err);
  }

  const email = req.body.email;
  const password = req.body.password;

  Admin.findOne({ email }).then((admin) => {
    if (!admin) {
      return res.status(404).json({ emailnotfound: "Email not found." });
    }

    bcrypt.compare(password, admin.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: admin.id,
          name: admin.name,
        };

        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926,
          },
          (err, token) => {
            res.json({
              success: true,
              name: admin.name,
              token: "Bearer" + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password Incorrect." });
      }
    });
  });
});

module.exports = router;
