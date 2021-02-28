module.exports = mongoose => {
  let schema = mongoose.Schema(
    {
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
        type: Number,
        required: false
      },
      city: {
        type: String,
        required: false
      },
      account_number: {
        type: Number,
        required: false
      },
      created_date: {
        type: Date,
        default: Date.now,
      }
    }, { timestamps: true }
  );

  schema.method( "toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  } );

  const Customer = mongoose.model( "customer", schema );
  return Customer;
};
