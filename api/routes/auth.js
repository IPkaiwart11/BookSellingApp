// const router = require("express").Router();
// const User = require("../models/User");
// const CryptoJS = require("crypto-js");
// const jwt = require("jsonwebtoken");

// //REGISTER
// router.post("/register", async (req, res) => {
//   const newUser = new User({
//     username: req.body.username,
//     img: req.body.img,
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
   
//     password: CryptoJS.AES.encrypt(
//       req.body.password,
//       process.env.PASS_SEC
//     ).toString(),
//     email: req.body.email,
//     isAdmin: req.body.isAdmin,
//   });

//   try {
//     const savedUser = await newUser.save();
//     res.status(200).json(savedUser);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //LOGIN

// router.post("/login", async (req, res) => {
//   try {
//     const user = await User.findOne({ username: req.body.username });
//     !user && res.status(401).json("Wrong credentials!");

//     const hashedPassword = CryptoJS.AES.decrypt(
//       user.password,
//       process.env.PASS_SEC
//     );
//     const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

//     OriginalPassword !== req.body.password &&
//       res.status(401).json("Wrong credentials!");

//     const accessToken = jwt.sign(
//       {
//         id: user._id,
//         isAdmin: user.isAdmin,
//       },
//       process.env.JWT_SEC,
//       {expiresIn:"1d"}
//     );
//     console.log(accessToken);

//     const { password, ...others } = user._doc;

//     res.status(200).json({...others, accessToken});
    
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });



// module.exports = router;


const express = require("express");
const router = express.Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      img: req.body.img,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      phoneNumber: req.body.phoneNumber,
      dateOfBirth: req.body.dateOfBirth,
      password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
      email: req.body.email,
      isAdmin: req.body.isAdmin || false // Set isAdmin to false if not provided
    });

    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
// router.post("/login", async (req, res) => {
//   try {
//     const user = await User.findOne({ username: req.body.username });
//     if (!user) {
//       return res.status(401).json("Wrong credentials!");
//     }

//     const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
//     const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

//     if (originalPassword !== req.body.password) {
//       return res.status(401).json("Wrong credentials!");
//     }

//     const accessToken = jwt.sign(
//       {
//         id: user._id,
//         isAdmin: user.isAdmin
//       },
//       process.env.JWT_SEC,
//       { expiresIn: "1d" }
//     );

//     const { password, ...others } = user._doc;
//     res.status(200).json({ ...others, accessToken });
//     console.log("Api: login succesfull!")
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json("Wrong credentials!");
    }

    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      return res.status(401).json("Wrong credentials!");
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin
      },
      process.env.JWT_SEC,
      { expiresIn: "1d" }
    );

    const { password, ...others } = user._doc;
    
    // Set token in response header
    res.set('Authorization', 'Bearer ' + accessToken);

    // Send user data along with token in response body
    res.status(200).json({ ...others, accessToken });
    console.log("Api: login succesfull!");
  } catch (err) {
    res.status(500).json(err);
    console.log("error:",err)
  }
});


module.exports = router;
