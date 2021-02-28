const express = require( "express" );
const bodyParser = require( "body-parser" );
const cors = require( "cors" );

const app = express();

// route handlers
customerRouter = require( "./routes/customer.routes" );

var corsOptions = {
  origin: ["http://localhost:5000", "http://localhost:3000"]
};

app.use( cors( corsOptions ) );

// parse requests of content-type - application/json
app.use( bodyParser.json() );

// parse requests of content-type - application/x-www-form-urlencoded
app.use( bodyParser.urlencoded( { extended: true } ) );

//TODO: UNCOMMENT TO USE MONGODB
const db = require( './models' );
db.mongoose.connect( db.url, {
  useUnifiedTopology: true,
  useNewUrlParser: true
} ).then( () => {
  console.log( "Connected to the database!" );
} ).catch( err => {
  console.log( 'Could not connect to the database!', err );
  process.exit();
} );

// declare route handlers AFTER all middleware used in the application
// custom route handle to handl requests to /api/customer
app.use( '/api/customers', customerRouter ); // -> localhost:5000/api/customer route


// simple route
app.get( "/", ( req, res ) => {
  res.json( { message: "Welcome to my application." } );
} );

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen( PORT, () => {
  console.log( `Server is running on port ${ PORT }.` );
} );
