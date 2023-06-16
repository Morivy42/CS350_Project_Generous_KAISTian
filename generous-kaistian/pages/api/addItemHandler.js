const client = require('../../components/dbConfig');

function add(photo, name, quantity, category, description, donator) {
    const insert = `insert into item(photo, name, quantity, category, description, donator) values($1, $2, $3, $4, $5, $6)`
    const params = [photo, name, quantity, category, description, donator]

    return client.query(insert, params)
}


export default async function addHandler(req, res) {
    const {
        itemName,
        itemCategory,
        itemQuantity,
        description,
        itemImage,
        userid,
      } = req.body
    
    // 폼 데이터 처리 로직
    // ...
    add(itemImage, itemName, itemQuantity, itemCategory, description, userid)
    .then( () => {
        console.log('cp')
        res.status(200).send('OK')
    })
    .catch (err => {
        console.error('Error adding item', err.stack)
        res.status(401).send('Fail')
    })
    // 다른 페이지로 리디렉션
    // res.redirect(`../items/feed-items?userid=${userid}`);
  }