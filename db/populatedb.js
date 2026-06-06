const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  username VARCHAR(50),
  password VARCHAR(100),
  membership VARCHAR(50),

  CONSTRAINT username_key UNIQUE (username)
);

CREATE TABLE IF NOT EXISTS messages (
  message_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER,
  title VARCHAR(50),
  text VARCHAR(150),
  timestamp TIMESTAMPTZ,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();