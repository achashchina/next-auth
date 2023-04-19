import { Schema, model, models } from 'mongoose';

const visitSchema = new Schema({
  customerId: String,
  visitDate: String,
  amount: String,
  email: String,
  phone: String,
  goods: Array,
  status: String,
});

const Visit = models.visit || model('visit', visitSchema);

export default Visit;
