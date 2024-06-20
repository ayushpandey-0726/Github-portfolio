const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Replace with your MongoDB Atlas connection string
const mongoUri = 'ayush07261006:ylMBfoNzHl7YEjjJ@contactformcluster.d7fvjph.mongodb.net/?retryWrites=true&w=majority&appName=ContactFormCluster';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String
});

const Contact = mongoose.model('Contact', contactSchema);

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;
  const newContact = new Contact({ name, email, phone, message });
  await newContact.save();
  res.status(201).send('Contact saved');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
