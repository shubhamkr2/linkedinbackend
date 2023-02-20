const { Router } = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userRoute = Router();

userRoute.get("/", (req, res) => {
  res.send("User Page");
});

userRoute.post("/register", async (req, res) => {
  const { name, email, gender, password, age, city } = req.body;
  //   console.log(req.body);
  try {
    const ifExists = await UserModel.find({ email: email });
    // console.log(ifExists.length);
    if (ifExists.length > 0) {
      res.status(500).send({ msg: "User already exist, please login" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          console.log(err);
          res.status(500).send({ msg: "User Registration failed" });
        } else {
          const newUser = new UserModel({
            name,
            email,
            gender,
            password: hash,
            age,
            city,
          });
          await newUser.save();
          res.status(200).send({ msg: "Your account has been created" });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
});

userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const ifExists = await UserModel.find({ email: email });
    if (ifExists.length > 0) {
      //checking pasword
      bcrypt.compare(password, ifExists[0].password, (err, result) => {
        // result == true
        if (result) {
          const token = jwt.sign(
            { id: ifExists[0]._id },
            process.env.SECRET_KEY
          );
          res.status(200).send({ msg: "logged in successfully", token: token });
        } else {
          res.status(500).send({ msg: "incorrect password" });
        }
      });
    }else{
        res.status(500).send({ msg: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
});

module.exports = { userRoute };
