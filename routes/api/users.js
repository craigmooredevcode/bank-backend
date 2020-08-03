const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

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
                .then(user => res.json(user))
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
      return res.status(404).json({accountNumber: "Input a Valid Account Number"})
    }
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

module.exports = router;


