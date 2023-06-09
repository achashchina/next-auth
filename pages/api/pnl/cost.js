import connectMongo from '../../../db/connection';
import Cost from '../../../model/CostSchema';

export default async function handler(req, res) {
  connectMongo().catch((error) => res.json({ error }));

  let response;

  switch (req.method) {
    case 'GET':
      response = await Cost.find({});
      break;
    case 'POST':
      const newLoss = new Cost({ ...req.body });
      response = await newLoss.save();
      break;
    case 'PATCH':
      await Cost.findOneAndUpdate({ _id: req.body._id }, req.body);
      response = await Cost.findOne({ _id: req.body._id });
      break;

    default:
      break;
  }

  try {
    return res.status(201).json({ status: true, response });
  } catch (error) {
    return res.status(404).json({ error });
  }
}
