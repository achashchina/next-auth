import { Schema, model, models } from 'mongoose';

const costSchema = new Schema({
  amount: Number,
  created: {
    createdBy: String,
    createdAt: String,
  },
  modified: {
    modifiedBy: String,
    modifiedAt: String,
  },
  description: String,
});

const Cost = models.cost || model('cost', costSchema);

export default Cost;
