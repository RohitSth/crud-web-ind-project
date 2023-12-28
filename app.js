// app.js
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database');
const Record = require('./models/record');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

// Create
app.post('/create', async (req, res) => {
  try {
    const { title, description } = req.body;
    const newRecord = await Record.create({ title, description });
    res.json(newRecord);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Read
app.get('/read', async (req, res) => {
  try {
    const records = await Record.findAll();
    res.json(records);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update
app.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    await Record.update({ title, description }, { where: { id } });
    res.json({ message: 'Record updated successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete
app.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Record.destroy({ where: { id } });
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Sync Sequelize Models with Database and Start Server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
