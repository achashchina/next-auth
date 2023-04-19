import { Schema, model, models } from 'mongoose';

const customerSchema = new Schema({
  firstName: String,
  lastName: String,
  company: String,
  email: String,
  phone: String,
  address: String,
  status: String,
});

const Customers = models.customer || model('customer', customerSchema);

export default Customers;
