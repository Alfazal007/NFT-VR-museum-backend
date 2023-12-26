const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

app.get('/nft-vr/service/', (req, res) => {
  return res.status(200).json({ message: 'Server is running' });
});

app.listen(process.env.PORT, async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_CONNECTION_STRING}`
    );
    console.log(
      `MongoDB connected !! DB Host : ${connectionInstance.connection.host}`
    );
    console.log('Working');
  } catch (err) {
    console.log('MongoDB connection error ', err);
  }
});
