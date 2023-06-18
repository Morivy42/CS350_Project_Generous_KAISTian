import client from '../../components/dbConfig'

export default async function byitemid(req, res) {
  const {userid, campaignid} = req.body;
//   console.log(req.body)
  const query = `select * from campaign where uploader = $1 and campaignid = $2`;
  client.query(query, [userid, campaignid])
      .then(result => {
          const exists = result.rows.length > 0;
        //   console.log(exists);
          if (exists) {
              res.status(200).json(result.rows[0]);
          } else {
              res.status(401).json({error: 'Cannot access to the given campaign'});
          }
      })
      .catch(err => {
          console.error('Error executing query:', err);
          res.status(500).json({error: 'An error occurred'});
      });
}