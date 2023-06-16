const client = require('../../components/dbConfig');

export default async function getitems(req, res) {
    const campaigns = `select * from campaign order by campaignid desc`;

    try {
        const result = await client.query(campaigns);
        // console.log(result.rows);
        res.status(200).json(result.rows);
      } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
