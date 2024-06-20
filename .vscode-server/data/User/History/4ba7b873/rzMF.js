const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Client } = require('pg');

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors());

const client = new Client({
  host: "database",
  user: "oclock",
  password: "passw0rd",
  database: "shop"
})

client.connect(function (err) {
  if (err) throw err;
  console.log("🟢 Connected to database");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
