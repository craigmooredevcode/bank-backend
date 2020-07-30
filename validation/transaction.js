const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateTransactionInput(data) {
  let errors = {}

  // Convert empty fields to an empty string so we can use validator functions
  data.accountNumber = !isEmpty(data.accountNumber) ? data.accountNumber : "";
  data.name = !isEmpty(data.name) ? data.name : "";
  data.reference = !isEmpty(data.reference) ? data.reference : "";
  data.amount = !isEmpty(data.amount) ? data.amount : "";


  // Account Number Checks
  if(Validator.isEmpty(data.accountNumber)) {
    errors.accountNumber = "Account number cannot be empty";
  }

  // Check for account number length
  if(!Validator.isLength(data.accountNumber, {min: 10, max: 10})) {
    errors.accountNumber = "Invalid Account number, it must be 10 digits";
  }

  // Name Checks
  if(Validator.isEmpty(data.name)) {
    errors.name = "Name field cannot be empty";
  }

  // Reference Checks
  if(Validator.isEmpty(data.reference)) {
    errors.reference = "Reference field cannot be empty";
  }

  // Amount checks
  if(Validator.isEmpty(data.amount)) {
    errors.amount = "Amount field cannot be empty";
  }
}