const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const server = express();
//load env vars
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const dotenv = process.env.DB_URI;


// route handlers
customerRouter = require("./routes/customer.routes");

server.use(cors());
server.use(express.json());

mongoose.connect(dotenv,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(() => {
  console.log('------- Connection with DB established -------');
  //set port, listen for requests
  const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
    console.log(`------- Server started at port ${PORT} -------`);
  });
}).catch(err => {
  console.log('Could not connect to the database!', err);
  process.exit();
});



// declare route handlers AFTER all middleware used in the application
// custom route handle to handle requests to /api/customer
server.use('/api/customers', customerRouter); // -> localhost:5000/api/customer route


server.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});




