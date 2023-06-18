import client from '../../components/dbConfig';

export default function handler(req, res) {
  const { title, category } = req.query;

  let query = '';
  let params = [];

  if (title) {
    query = 'SELECT * FROM "item" WHERE name LIKE $1';
    params = [`%${title}%`];
  } else if (category) {
    query = 'SELECT * FROM "item" WHERE category LIKE $1';
    params = [`%${category}%`];
  } else {
    return res.status(400).json({ message: 'Invalid search parameters' });
  }

  client.query(query, params)
    .then(result => {
      const rows = result.rows;
      console.log('Search data retrieved:', rows);
      res.status(200).json(rows);
    })
    .catch(err => {
      console.error('Error retrieving data', err.stack);
      res.status(500).json({ message: 'Error retrieving data' });
    });
}
