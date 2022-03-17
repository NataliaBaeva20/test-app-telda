const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { PORT = 3001 } = process.env;

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const app = express();

// подключение к серверу mongo
mongoose.connect('mongodb://localhost:27017/teldadb');

app.use(cors());

app.use(express.json());

app.post('/signup', createUser);
app.post('/signin', login);
app.use(auth);
app.use('/users', require('./routes/users'));
app.use('*', () => {
  throw new NotFoundError('Ресурс не найден');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
});