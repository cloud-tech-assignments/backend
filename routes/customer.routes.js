// create a express router makes it work
let router = require('express').Router();

//DB connection
const Customer = require('../models/customer.model');
const EXCLUDE_COLUMNS = { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 };

//Create a new customer
router.post('/', (req, res) => {
  let t2 = Date.now();
  //validate request
  const personal_number = req.body.personal_number;
  console.log(personal_number);
  if (!personal_number) {
    res.status(400).send({ message: 'Personal number can not be empty!' });
  }

  const customer = new Customer({
    personal_number: req.body.personal_number,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    date_of_birth: req.body.date_of_birth,
    city: req.body.city,
    account_number: req.body.account_number,
  });

  console.log('CUSTOMER: ', customer);
  Customer.exists({ personal_number }).then((data) => {
    if (data) {
      res.status(400).json({ message: 'Customer already exists' });
    } else {
      customer
        .save(customer)
        .then((newCustomer) => {
          const {
            personal_number,
            first_name,
            last_name,
            date_of_birth,
            city,
            account_number,
          } = newCustomer;

          const payload = {
            personal_number,
            first_name,
            last_name,
            date_of_birth,
            city,
            account_number,
          };
          console.log(newCustomer);
          res.status(200).send({ newCustomer: payload, t4: Date.now(), t2 });
        })
        .catch((err) => {
          res.status(500).json({
            message: err.message || 'Some error occurred while saving customer',
          });
        });
    }
  });
});

//Retrieve all customers
router.get('/all', (req, res) => {
  let t2 = Date.now();
  Customer.find({}, EXCLUDE_COLUMNS)
    .then((customers) => {
      console.log(customers);
      res.status(200).send({ customers, t4: Date.now(), t2 });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: 'Server ran into an error processing the request' });
    });
});

// Retrieve a single customer with personal number
router.get('/:personalNumber', (req, res) => {
  let t2 = Date.now();
  const { personalNumber } = req.params;
  const convertedNumber = Number(personalNumber);

  if (typeof convertedNumber !== 'number') {
    res
      .status(422)
      .json({ message: 'Please send a number as the personal number' });
  } else {
    Customer.findOne({ personal_number: personalNumber }, EXCLUDE_COLUMNS)
      .then((customer) => {
        res.status(200).json({ customer, t4: Date.now(), t2 });
        console.log(customer);
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ message: 'Server ran into an error processing the request' });
      });
  }
});

//Delete a costumer with personal number
router.delete('/:personalNumber', (req, res) => {
  let t2 = Date.now();
  const { personalNumber } = req.params;
  const convertedNumber = Number(personalNumber);

  if (typeof convertedNumber !== 'number') {
    res
      .status(422)
      .json({ message: 'Please send a number as the personal number' });
  }

  Customer.findOneAndDelete({ personal_number: personalNumber })
    .then((deletedCustomer) => {
      const {
        personal_number,
        first_name,
        last_name,
        date_of_birth,
        city,
        account_number,
      } = deletedCustomer;

      const payload = {
        personal_number,
        first_name,
        last_name,
        date_of_birth,
        city,
        account_number,
      };
      console.log(deletedCustomer);
      res.status(200).json({ deletedCustomer: payload, t4: Date.now(), t2 });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: 'Server ran into an issue processing the request' });
    });
});

//Update a customer with personal number
router.put('/:personalNumber', (req, res) => {
  let t2 = Date.now();
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update cannot be empty!',
    });
  }

  const { personalNumber } = req.params;

  Customer.findOneAndUpdate({ personal_number: personalNumber }, req.body, {
    new: true,
    useFindAndModify: false,
  }).then((updatedCustomer) => {
    if (!updatedCustomer) {
      res.status(400).send({
        message: `Cannot update customer with personal number ${personalNumber}. Maybe the customer was not found`,
      });
    } else {
      const {
        personal_number,
        first_name,
        last_name,
        date_of_birth,
        city,
        account_number,
      } = updatedCustomer;

      const payload = {
        personal_number,
        first_name,
        last_name,
        date_of_birth,
        city,
        account_number,
      };
      console.log(updatedCustomer);
      res.status(200).json({ updatedCustomer: payload, t4: Date.now(), t2 });
    }
  });
});

//Export router to be used in the server file
module.exports = router;
