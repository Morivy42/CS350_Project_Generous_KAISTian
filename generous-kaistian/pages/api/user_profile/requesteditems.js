const client = require('../../../components/dbConfig');

export default async function requestedItems(req, res) {
    // console.log(req.body)
    const { userid } = req.body
    // console.log('received:'+userid)
    const approvedquery = `select *, 1 as status from item where confirmed_user = $1 order by itemid desc`;
    const waitingquery = `select *, 0 as status from item where requested_users @> ARRAY[$1*1] order by itemid desc`;
    const rejectedquery = `select *, -1 as status from item where rejected_users @> ARRAY[$1*1] order by itemid desc`;
    const params = [ userid ]

    client.query(approvedquery,params)
    .then(approved => {
      client.query(waitingquery,params)
      .then(waiting => {
        client.query(rejectedquery,params)
        .then(rejected => {
          const response = [...approved.rows, ...waiting.rows, ...rejected.rows]
          // console.log(response)
          res.status(200).json(response)
        })
      })
    }).catch(err => {
      console.error('Error getting items', err.stack)
      res.status(401).send('Fail')
    })
  // try {
  //   const approved = await client.query(approvedquery, params);
  //   const waiting = await client.query(waitingquery, params);
  //   const rejected = await client.query(rejectedquery, params);
  //   const response = [...approved.rows, ...waiting.rows, ...rejected.rows]
  //   console.log(response)
  //   res.status(200).json(response);
  // } catch (error) {
  //   console.error('Error getting items', error)
  //   res.status(401).send('Fail')
  // }
}
