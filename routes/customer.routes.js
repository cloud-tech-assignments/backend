const customers = require( "../controllers/customer.controller" );

// create a express router
let router = require( "express" ).Router();

//Create a new customer
router.post( "/", customers.create );

//Retrieve all customers
router.get( "/", customers.findAll );

//retrieve a single customer with id
router.get( "/:id", customers.findOne );

//delete a customer with id
router.delete( "/:id", customers.delete );

// export router to be used in the server file
module.exports = router;
