const express = require('express')
const db = require('../models')
const router = express.Router()
const argon2 = require("argon2")
const { makeToken } = require("../utils")
const { checkForUser } = require('../middleware/auth.middleware')

router.post("/login", async (req, res, next) => {

  try {
    const user = await db.User.findOne({
      where: {
        email: req.body.email
      },
      attributes: ["id","email","role","password"],
    })

    if (!user) {
      return res.status(403).send({
        "msg": "user not exist"
      })
    }

    const passwordOk = await argon2.verify(user.password, req.body.password)
   let use_details = ''
    if(passwordOk){
     use_details = user.toJSON()
     delete use_details.password
    }

    if (!passwordOk) {
      return res.status(403).send({
        msg: "user credntials invalid",
      });
    }
  
    const token = makeToken({
      user: use_details
    })
    return res.send({
      token
    })

  } catch (error) {
    console.log(error);
    next(error);
  }
})

router.post("/signup", async (req, res, next) => {
  console.log(req.body);


  try {
    //check if the email is taken
    const userNameTaken = await db.User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (userNameTaken) {
      return res.status(201).send({
        msg: "username already exist",
      });
    }
    //PASSWORD HASH
    const passwordHash = await argon2.hash(req.body.password);

    //PASSWORD VERIFICATION
    const passwordSame = await argon2.verify(passwordHash, req.body.password);
    if(passwordSame){
      const userPaylad = {
        ...req.body,
        password: passwordHash,
        confirmPassword:''
      };
  
      const newUser = await db.User.create(userPaylad);
      return res.status(200).send({
        id: newUser.id,
      });
    }

  } catch (error) {
    console.log(error);
    next(error);
  }
})

router.get("/get_all_user",checkForUser, async (req, res, next) => {
  try {
    const userInfo = await db.User.findAll({
      attributes:["id","firstName","lastName","roll_number","department","dob","email","role"]
    });
    return res.status(200).send(userInfo);
  } catch (error) {
    return next(error);
  }
})

router.get("/info",checkForUser, async (req, res, next) => {
  try {
    const userInfo = await db.User.findOne({
      where: {
        id: res.locals.user,
      },
      attributes: ["id", "name","role"],
    });
    const json = JSON.parse(JSON.stringify(userInfo));
    return res.status(200).send({ ...json });
  } catch (error) {
    return next(error);
  }
})

module.exports = router