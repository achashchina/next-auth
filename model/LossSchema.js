import { Schema, model, models } from 'mongoose';

const lossSchema = new Schema({
  lossType: String,
  amount: Number,
  date: Date,
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

const Loss = models.loss || model('loss', lossSchema);

export default Loss;
