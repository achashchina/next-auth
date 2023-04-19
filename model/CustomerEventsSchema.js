import { Schema, model, models } from 'mongoose';

const customerEventSchema = new Schema({
  customerId: String,
  eventDate: String,
  note: String,
  nextEventDate: String,
});

const CustomerEvent = models.customerEvent || model('customerEvent', customerEventSchema);

export default CustomerEvent;
