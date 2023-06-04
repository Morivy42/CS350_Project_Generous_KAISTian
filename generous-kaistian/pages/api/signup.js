import client from '../../components/dbConfig';

export default async function SignUp(req, res) {
    const { Name, Nickname, Avatar, Email, Contact, Password } = req.body;

    const query = `insert into "User"(name, nickname, avatar, email, contact, password) values ($1, $2, $3, $4, $5, $6)`;
    params = [Name, Nickname, Avatar, Email, Contact, Password];

    client.query(query, params)
        .then(() => {
            console.log('Register success');
            res.sendStatus(200);
        })
        .catch(err => {
            console.error('Error registering', err.stack);
            res.sendStatus(500);
        })
}