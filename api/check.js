import Cors from 'cors';
import initMiddleware from '../lib/init-middleware';

// CORS Middleware
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST'],
    origin: '*',
  })
);

export default async function handler(req, res) {
  await cors(req, res);

  const { phone } = req.query;

  if (!phone) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  try {
    const response = await fetch(`https://bdcourier.com/api/courier-check?phone=${phone}`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer h5QdoQhKNUDWSOJC9TJT1e13ZxILO5nE01YCl0UdmBHDhGURhuQ6oFAOYtD0'
      }
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
