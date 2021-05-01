const cors = require('cors');
const express = require('express');
const mysql = require('mysql');
const dotenv = require("dotenv");
const app = express();
const path = require("path");
const morgan = require("morgan");

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});


// Load configuration files
dotenv.config({ path: "./config.env" });

// Dev logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());

app.listen(process.env.REACT_APP_SERVER_PORT, () => {
  console.log(`App server now listening on port ${process.env.REACT_APP_SERVER_PORT}`);
});

app.get('/test', (req, res) => {
  const { table } = req.query;

  pool.query(`select * from ${table}`, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});