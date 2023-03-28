import { Schema, model, models } from 'mongoose';

const customerSchema = new Schema({
  isActive: Boolean,
  balance: Number,
  age: Number,
  firstName: String,
  lastName: String,
  gender: String,
  company: String,
  email: String,
  phone: String,
  address: String,
});

const Customers = models.customer || model('customer', customerSchema);

export default Customers;
