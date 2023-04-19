import connectMongo from '../../../db/connection';
import Customers from '../../../model/CustomersSchema';

export default async function handler(req, res) {
  connectMongo().catch((error) => res.json({ error }));
  const { email } = req.body;

  let result;
  switch (req.method) {
    case 'GET':
      result = await Customers.find({});
      break;
    case 'POST':
      const isExist = await Customers.findOne({ email });
      if (isExist) {
        return res.status(404).json({ error: `Customer with email ${email} already exist. Please use the search!` });
      }
      const newCustomer = new Customers({ ...req.body });
      result = await newCustomer.save();
      break;

    case 'DELETE':
      result = await Customers.deleteOne({ email });
      break;

    case 'PATCH':
      const ss= await Customers.findOneAndUpdate({ _id: req.body._id }, { status: req.body.status });
      result = await Customers.findOne({ _id: req.body._id });
      break;

    default:
      res.status(500).json({ message: 'HTTP method not valid only GET Accepted' });
      break;
  }

  try {
    return res.status(201).json({ status: true, result });
  } catch (error) {
    return res.status(404).json({ error });
  }
}
