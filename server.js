const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
//load env vars
require('dotenv').config();

// route handlers
customerRouter = require("./routes/customer.routes");

var corsOptions = {
  origin: ["http://localhost:5000", "http://localhost:3000"]
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(process.env.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(() => {
  console.log('------- Connection with DB established -------');

  //set port, listen for requests
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`------- Server started at port ${ PORT } -------`);
  });
}).catch(err => {
  console.log('Could not connect to the database!', err);
  process.exit();
});

// declare route handlers AFTER all middleware used in the application
// custom route handle to handle requests to /api/customer
app.use('/api/customers', customerRouter); // -> localhost:5000/api/customer route


app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});




