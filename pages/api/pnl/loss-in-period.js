import moment from 'moment';
import connectMongo from '../../../db/connection';
import Loss from '../../../model/LossSchema';

export default async function handler(req, res) {
  connectMongo().catch((error) => res.json({ error }));

  let response;

  switch (req.method) {
    case 'POST':
      const startOfMonth = new Date(moment().startOf('month').format('YYYY-MM-DD')).toISOString();
      const endOfMonth = new Date(moment().endOf('month').format('YYYY-MM-DD')).toISOString();
      response = await Loss.find({
        date: { $gte: startOfMonth, $lte: endOfMonth },
      });
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
