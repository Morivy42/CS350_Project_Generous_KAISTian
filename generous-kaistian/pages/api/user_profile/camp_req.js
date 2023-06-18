const client = require('../../../components/dbConfig');

export default async function requestedCampaigns(req, res) {
    const { userid } = req.body;
    const approvedquery = `select *, 1 as status from campaign where campaignid in (select unnest(campaigns) from "User" where userid = $1) order by campaignid desc`
    const waitingquery = `select *, 0 as status from campaign where campaignid in (select unnest(waiting_campaign) from "User" where userid = $1) order by campaignid desc`
    const params = [ userid ]

    try {
        const approved = await client.query(approvedquery, params)
        const waiting = await client.query(waitingquery, params)
        const response = [...approved.rows, ...waiting.rows]
        // console.log(result.rows);
        res.status(200).json(response);
      } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
