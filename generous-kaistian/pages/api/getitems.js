const client = require('../../components/dbConfig');

export default async function getitems(req, res) {
    const items = `select * from Item order by itemid desc`;

    try {
        const result = await client.query(items);
        // console.log(result.rows);
        res.status(200).json(result.rows);
      } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
