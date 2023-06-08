import client from '../../dbConfig';

export default async function LogInCheck(req, res) {
    const email = req.query.email;
    const password = req.query.password;

    const query = `select * from "User" where email = $1 and password = $2`;
    console.log('cp')
    client.query(query, [email, password])
        .then(result => {
            const exists = result.rows.length > 0;
            console.log(exists);
            if (exists) {
                res.sendStatus(200);
            } else {
                res.status(401).json({error: 'Invalid user'});
            }
        })
        .catch(err => {
            console.error('Error executing query:', err);
            res.status(500).json({error: 'An error occurred'});
        });
}