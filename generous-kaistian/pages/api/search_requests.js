import client from '../../components/dbConfig';

export default function handler(req, res) {
  const { title } = req.query;

  let query = '';
  let params = [];

  if (title) {
    query = 'select * from request WHERE itemid = $1';
    params = [title];
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
