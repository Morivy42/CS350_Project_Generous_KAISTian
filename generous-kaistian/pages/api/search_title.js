const client = require('../../components/dbConfig');

export default async function SearchTitle(req, res) {
    const { title } = req.query;
    console.log(title);
    
    const titlequery = `select * from Item where name like $1`;
    const params = ['%'+title+'%'];

    try {
        const result = await client.query(titlequery, params);
        console.log(result.rows);
        res.status(200).json(result.rows);
      } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
