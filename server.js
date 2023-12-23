const express = require('express');
const app = express();
const dotenv = require('dotenv').config();

app.get('/nft-vr/service/', (req, res) => {
  return res.status(200).json({ message: 'Server is running' });
});

app.listen(process.env.PORT, () => {
  console.log('Server is up and running');
});
