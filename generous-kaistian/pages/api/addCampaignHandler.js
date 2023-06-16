const client = require('../../components/dbConfig');

// check schema modification for image field !
function add(uploader, name, category, description, image) {
    const insert = `insert into campaign(uploader, name, image, category, description, waiting, numpart) values($1, $2, $3, $4, $5, true, 0)`
    const params = [uploader, name, image, category, description]

    return client.query(insert, params)
}

export default async function addHandler(req, res) {
    const {
        userid,
        campaignName,
        campaignCategory,
        description,
        campaignImage,
      } = req.body
    
    add(userid, campaignName, campaignCategory, description, campaignImage)
    .then( () => {
        console.log('cp')
        res.status(200).send('OK')
    })
    .catch (err => {
        console.error('Error adding item', err.stack)
        res.status(401).send('Fail')
    })
  }