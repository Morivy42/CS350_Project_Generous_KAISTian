const client = require('../../../components/dbConfig');

export default async function initiatedCampaigns(req, res) {
    const { userid } = req.body;
    const campaigns = `select * from Campaign where uploader = $1 order by campaignid desc`;
    const params = [ userid ]

    try {
        const result = await client.query(campaigns, params);
        // console.log(result.rows);
        res.status(200).json(result.rows);
      } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
