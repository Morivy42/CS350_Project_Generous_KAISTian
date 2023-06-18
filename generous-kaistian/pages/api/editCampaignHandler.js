const client = require('../../components/dbConfig');

function edit(photo, name, category, description, uploader, campaignid) {
    const update = `update campaign set (image, name, category, description) = ($1, $2, $3, $4) where uploader = $5 and campaignid = $6`
    const params = [photo, name, category, description, uploader, campaignid]

    return client.query(update, params)
}

export default async function editItemHandler(req, res) {
    const {
        userid,
        campaignid,
        campaignName,
        campaignCategory,
        description,
        campaignImage
      } = req.body

    // 폼 데이터 처리 로직
    // ...
    edit(campaignImage, campaignName, campaignCategory, description, userid, campaignid)
    .then( () => {
        res.status(200).send('OK')
    })
    .catch (err => {
        console.error('Error editing campaign', err.stack)
        res.status(401).send('Fail')
    })
    // 다른 페이지로 리디렉션
    // res.redirect(`../items/feed-items?userid=${userid}`);
  }