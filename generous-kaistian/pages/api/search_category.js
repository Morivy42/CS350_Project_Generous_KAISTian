const client = require('../../components/dbConfig');

export default async function SearchCategory(req, res) {
    const { category } = req.query;
    console.log(category);
    
    const titlequery = `select * from Item where category = $1`;
    const params = [category];

    try {
        const result = await client.query(titlequery, params);
        console.log(result.rows);
        res.status(200).json(result.rows);
      } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
