import { hash } from 'bcryptjs';
import connectMongo from '../../../db/connection';
import Users from '../../../model/UsersSchema';

export default async function handler(req, res) {
  connectMongo().catch((error) => res.json({ error }));

  if (req.method === 'POST') {
    if (!req.body) return res.status(404).json({ error: "Don't have form data...!" });
    const { username, email, password } = req.body;

    const checkexisting = await Users.findOne({ email });
    if (checkexisting) return res.status(422).json({ message: 'User Already Exists...!' });

    const newUser = new Users({ username, email, password: await hash(password, 12) });
    const user = await newUser.save();
    try {
      return res.status(201).json({ status: true, user });
    } catch (error) {
      return res.status(404).json({ error });
    }
  } else {
    res.status(500).json({ message: 'HTTP method not valid only POST Accepted' });
  }
}
