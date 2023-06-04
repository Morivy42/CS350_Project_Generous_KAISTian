const client = require('../../components/dbConfig');

export default async function Search(req, res) {

    const titlequery = `select * from Item`;
    // const params = ['%'+title+'%'];

    try {
        const result = await client.query(titlequery);
        // console.log(result.rows);
        res.status(200).json(result.rows);
      } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
