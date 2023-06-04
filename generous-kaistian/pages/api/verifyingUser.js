import client from '../../components/dbConfig';

export default async function LogInCheck(req, res) {
    const { mail, pw } = await req.body;

    console.log(pw);
    const query = `select * from "User" where email = $1 and password = $2`;
    client.query(query, [mail, pw])
        .then(result => {
            const exists = result.rows.length > 0;
            console.log(exists);
            if (exists) {
                res.status(200).send();
            } else {
                res.status(401).json({error: 'Invalid user'});
            }
        })
        .catch(err => {
            console.error('Error executing query:', err);
            res.status(500).json({error: 'An error occurred'});
        });
}