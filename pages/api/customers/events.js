import connectMongo from '../../../db/connection';
import CustomerEvent from '../../../model/CustomerEventsSchema';

export default async function handler(req, res) {
  connectMongo().catch((error) => res.json({ error }));

  if (req.method === 'POST' || req.method === 'PATCH' || req.method === 'GET') {
    let response;

    switch (req.method) {
      case 'POST':
        const newEvent = new CustomerEvent({ ...req.body });
        response = await newEvent.save();
        break;

    //   case 'PATCH':
    //     await Visits.findOneAndUpdate({ _id: req.body._id }, {status: req.body.status});
    //     response = await Visits.findOne({ _id: req.body._id });
    //     break;

      case 'GET':
        response = await CustomerEvent.find({});
        break;

      default:
        break;
    }

    try {
      return res.status(201).json({ status: true, response });
    } catch (error) {
      return res.status(404).json({ error });
    }
  } else {
    res.status(500).json({ message: 'HTTP method not valid only POST Accepted' });
  }
}
