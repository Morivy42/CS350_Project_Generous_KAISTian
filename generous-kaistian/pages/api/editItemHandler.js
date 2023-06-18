const client = require('../../components/dbConfig');

function edit(photo, name, quantity, category, description, donator, itemid) {
    const update = `update item set (photo, name, quantity, category, description) = ($1, $2, $3, $4, $5) where donator = $6 and itemid = $7`
    const params = [photo, name, quantity, category, description, donator, itemid]

    return client.query(update, params)
}

export default async function editItemHandler(req, res) {
    const {
        userid,
        itemid,
        itemName,
        itemCategory,
        itemQuantity,
        description,
        itemImage,
      } = req.body

    // 폼 데이터 처리 로직
    // ...
    edit(itemImage, itemName, itemQuantity, itemCategory, description, userid, itemid)
    .then( () => {
        res.status(200).send('OK')
    })
    .catch (err => {
        console.error('Error adding item', err.stack)
        res.status(401).send('Fail')
    })
    // 다른 페이지로 리디렉션
    // res.redirect(`../items/feed-items?userid=${userid}`);
  }