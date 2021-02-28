const db = require( "../models" );
const customer = require( "../models/customer.model" );
const Customer = db.customers;

// Create and save a new customer
exports.create = function ( req, res ) {
  //validate request
  const personal_number = req.body.personal_number;

  if ( !req.body.personal_number ) {
    res.status( 400 ).send( { message: "Personal number can not be empty!" } );
    return;
  }

  const customer = new Customer( {
    personal_number: req.body.personal_number,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    date_of_birth: req.body.date_of_birth,
    city: req.body.city,
    account_number: req.body.account_number,
  } );

  Customer.exists( { personal_number } )
    .then( data => {

      if ( data ) {
        res.status( 400 ).send( { message: "customer already exists" } );
      } else {
        customer.save( customer )
          .then( resData => {
            res.send( resData );
          } )
          .catch( err => {
            res.status( 500 ).send( {
              message:
                err.message || "some error occurred while saving customer"
            } );
          } );

      }
    } );

};

// Retrieve all customers from the database
exports.findAll = ( req, res ) => {
  const personal_number = req.query.personal_number;
  let condition = personal_number ? { personal_number: { $regex: new RegExp( personal_number ), $options: "i" } } : {};

  Customer.find( condition )
    .then( data => {
      res.send( data );
    } )
    .catch( err => {
      res.status( 500 ).send( {
        message:
          err.message || "Some error occurred while retrieving the customers"
      } );
    } );
};

// Find a single customer by its id
exports.findOne = ( req, res ) => {
  const id = req.params.id;

  Customer.findById( id )
    .then( data => {
      if ( !data ) {
        res.status( 404 ).send( { message: "Not found customer by id" } );
      } else {
        res.send( data );
      }
    } )
    .catch( err => {
      res
        .status( 500 )
        .send( {
          message:
            err.message || "Error retrieving customer with id+"
        } + id );
    } );
};

// Update a customer by its id
exports.update = ( req, res ) => {
  if ( !req.body ) {
    return res.status( 400 ).send( {
      message: "Data to update cannot be empty!"
    } );
  }

  const id = req.params.id;

  Customer.findByIdAndUpdate( id, req.body, { useFindAndModify: false } )
    .then( data => {
      if ( !data ) {
        res.status( 400 ).send( {
          message: `Cannot update customer with id=${ id }. Maybe the customer was not found!`
        } );
      } else {
        res.send( { message: "Customer was updated successfully" } );
      }
    } );
};

// Delete a customer by its id
exports.delete = ( req, res ) => {
  const id = req.params.id;
  Customer.findOneAndDelete( { personal_number: id } )
    .then( data => {
      if ( data !== null ) {
        res.status( 200 ).send( {
          message: `Customer with personal_number ${ id } was deleted successfully`
        } );
      } else {
        res.status( 400 ).send( {
          message: `Customer with personal_number: ${ id } was not found`
        } );
      }
    } );
};

