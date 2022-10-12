require('./helpers/connectToDb');
const cors = require('cors');

const express = require('express');
const app = express();

const usersRouter = require('./users/routes/routes');
const cardsRouter = require('./cards/routes/routes');

app.use(express.json());
app.use(cors());
app.use('/api/users', usersRouter);
app.use('/api/cards', cardsRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`server run on: http://localhost:${PORT}`));
