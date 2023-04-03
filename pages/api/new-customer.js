import connectMongo from '../../db/connection';
import Customers from '../../model/CustomersSchema';

export default async function handler(req, res) {
  connectMongo().catch((error) => res.json({ error }));

  if (req.method === 'POST') {
    const newCustomer = new Customers({...req.body});
    const customer = await newCustomer.save();

    try {
      return res.status(201).json({ status: true, customer });
    } catch (error) {
      return res.status(404).json({ error });
    }
  } else {
    res.status(500).json({ message: 'HTTP method not valid only POST Accepted' });
  }
}
