const client = require('../../components/dbConfig');

export default async function ViewStat(req, res) {
    const { RequestID } = req.query;
    
    const itemquery = `select * from Request join Item where RequestID = $1`;
    const params = [RequestID];

    try {
        const result = await client.query(itemquery, params);
        row = result.rows[0];
        const waiting = row.requested_users.includes(RequestID);
        const confirmed = row.confirmed_user == RequestID;
        row_with_stat = row;
        if (waiting) {
            row_with_stat["status"]="waiting";
        } else if (confirmed) {
            row_with_stat["status"]="approved";
        } else {
            row_with_stat["status"]="rejected";
        }
        res.status(200).json(row_with_stat);
      } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
