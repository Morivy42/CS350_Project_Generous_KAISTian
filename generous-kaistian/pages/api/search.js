import client from '../../components/dbConfig';

export default function SearchTitle(req, res) {
  const { title } = req.query;

  const titleQuery = `SELECT * FROM "item" WHERE name LIKE $1`;
  const params = [`%${title}%`];

  client.query(titleQuery, params)
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
