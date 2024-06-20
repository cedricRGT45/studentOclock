const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Client } = require('pg');

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors());

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

client.connect(function (err) {
  if (err) throw err;
  console.log("🟢 Connected to database");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
