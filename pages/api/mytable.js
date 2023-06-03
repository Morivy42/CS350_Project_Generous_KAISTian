import { Client } from 'pg';

export default async function handler(req, res) {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'mydatabase',
    password: 'nice',
    port: 5432, // or your PostgreSQL port
  });

  try {
    await client.connect();

    const result = await client.query('SELECT * FROM mytable');
    const data = result.rows;

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.end();
  }
}