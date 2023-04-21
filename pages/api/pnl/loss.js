import connectMongo from '../../../db/connection';
import Loss from '../../../model/LossSchema';

export default async function handler(req, res) {
  connectMongo().catch((error) => res.json({ error }));

  let response;

  switch (req.method) {
    case 'GET':
      response = await Loss.find({});
      break;
    case 'POST':
      const newLoss = new Loss({ ...req.body });
      response = await newLoss.save();
      break;
    case 'PATCH':
      await Loss.findOneAndUpdate({ _id: req.body._id }, req.body);
      response = await Loss.findOne({ _id: req.body._id });
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
