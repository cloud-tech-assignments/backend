const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    personal_number: {type: Number, required: true, unique: true},
    account_number: {type: Number, required:true, unique: true},
    first_name: {type: String, required: true, trim: true},
    last_name: {type: String, required: true, trim: true},
    date_of_birth: {type: Date, required: true, max: Date.now()},
    city: {type: String, required: true, trim: true}
  },
  {timestamps: true}
);

const Customer = mongoose.model('customer', schema);
module.exports = Customer;
