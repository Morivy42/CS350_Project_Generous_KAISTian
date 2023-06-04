import client from '../../components/dbConfig';

export default async function LogInCheck(req, res) {
    const email = req.query.email;
    const password = req.query.password;

    const query = `select * from "User" where email = $1 and password = $2`;
    client.query(query, [email, password])
        .then(result => {
            const exists = result.rows.length > 0;
            res.json({exists});
        })
        .catch(err => {
            console.error('Error executing query:', err);
            res.status(500).json({error: 'An error occurred'});
        });
}