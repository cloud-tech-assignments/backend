const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  personal_number: {
    type: Number,
    required: false,
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: false
  },
  date_of_birth: {
    type: Date,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  account_number: {
    type: Number,
    required: false
  }
}, { timestamps: true }
);

const Customer = mongoose.model("customer", schema);
module.exports = Customer;

