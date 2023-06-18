const client = require('../../../components/dbConfig');

export default async function donatedItems(req, res) {
    const { userid } = req.body;
    const items = `select *, COALESCE(array_length(requested_users, 1),0) as numberOfRequests from Item where donator = $1 order by itemid desc`;
    const params = [ userid ]

    try {
        const result = await client.query(items, params);
        // console.log(result.rows);
        res.status(200).json(result.rows);
      } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
