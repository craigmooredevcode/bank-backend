const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const nodemailer = require("nodemailer");
require('dotenv').config();

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");


// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        }

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            balance: req.body.balance,
            accountNumber: req.body.accountNumber
        });

        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
                .save()
                .then(user => {
                  res.json(user)

                  // send email on successful registration
                    const transporter = nodemailer.createTransport({
                      service: 'gmail',
                      auth: {
                        user: process.env.FROM_EMAIL,
                        pass: process.env.EMAIL_PASSWORD
                      }
                    });

                    const mailOptions = {
                      from: 'noreply@primeonline.online',
                      to: req.body.email,
                      subject: 'Prime Bank - Online Banking Account Created',
                      // text: 'It works!'
                      html: `
                        <h1>Your Prime Online Banking Account was Successfully Created </h1>
                        <p><strong>Dear ${req.body.name},</p>
                        <p>We are happy to let you know that your prime online banking account has been successfully created and activated.</p>
                        <p>Ready to get started? <a href="#">Sign in</a> to your account now and start receiving and sending payment</p>
                        <p>If you have any questions, <a href="https://primeonline.online/#contact">contact us</a></p>
                        <br />
                        <p><em>Thank you, The Prime Bank Team</em></p>
                      `
                    }

                    transporter.sendMail(mailOptions, (err, data) => {
                      if(err) {
                        console.log('Error occurs', err);
                      } else {
                        console.log('Email sent!')
                      }
                    })
                })
                .catch(err => console.log(err));
            });
        });
    });
});


// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ email: "This user does not exist" });
      }

      // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // send email on successful login
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.FROM_EMAIL,
              pass: process.env.EMAIL_PASSWORD
            }
          });

          const mailOptions = {
            from: 'noreply@primeonline.online',
            to: user.email,
            subject: 'Prime Bank - Sign In Success',
            // text: 'It works!'
            html: `
              <h1>You've just signed in successfully</h1>
              <p>It looks like you just signed in to your primeonline online banking account. If this is not you, please let us know immediately</p>
              <br />
              <p><em>Towards an awesome banking experience</em></p>
            `
          }

          transporter.sendMail(mailOptions, (err, data) => {
            if(err) {
              console.log('Error occurs', err);
            } else {
              console.log('Email sent!')
            }
          })

          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name,
            balance: user.balance,
            email: user.email,
            isAdmin: user.isAdmin
          };

          // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ password: "Password you entered is incorrect" });
        }
      });
    });
});


// @route get api/users/:acct_num
// @desc Get a specific user by its account number
// @access Private
router.get("/:acct_num", (req, res) => {
  const accountNumber = req.params.acct_num;
  User.findOne({ accountNumber }).then(user => {
    if(user) {
      return res.status(200).send(user);
    } else {
      return res.status(404).json({userExist: false});
    }
  }).catch(err => {
    res.status(404).json({
      userExist: false
    })
  })
});

router.get("/user/:id", (req, res) => {
  const id = req.params.id;
  User.findOne({ _id: id }).then(user => {
    if(user) {
      return res.status(200).send(user);
    } else {
      return res.status(404).json({user: "User does not exist"})
    }
  })
})


// @route get api/users
// @desc Get all users
// @access Private

router.get("/", (req, res) => {
  User.find({isAdmin: false}).then(users => {
    return res.status(200).send(users)
  }).catch(err => {
    res.status(500).json({
      status: false,
      message: err.response
    })
  })
})


router.delete("/user/:email", (req, res) => {
  const userEmail = req.params.email;
  User.deleteOne({email: userEmail}).then(user => {
    return res.status(200).json({
      status: true,
      message: "User successfully deleted"
    })
  }).catch(err => {
    return res.status(500).json({
      status: false,
      message: err.message
    })
  })
})

// @route update api/users
// @desc Update a particular user
// @access Private

router.patch("/user/:id", (req, res) => {
  const { photoURL, occupation, phone } = req.body;
  if(!photoURL && !occupation && !phone) {
    return res.status(400).send({
      status: false,
      message: "No update was sent"
    })
  }

  User.findOne({_id: req.params.id}).then(user => {
    let newValues = { $set: { } };
    if(photoURL) {
      newValues.$set.photoURL = photoURL;
    }
    if(occupation) {
      newValues.$set.occupation = occupation;
    }
    if(phone) {
      newValues.$set.phone = phone;
    }

    User.updateOne({_id: req.params.id}, newValues).then(data => {
      res.status(200).json({
        data: data
      })
    }).catch(err => {
      res.status(404).send({
        status: false,
        message: "User does not exist"
      })
    })
  })
})

module.exports = router;
