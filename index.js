const express = require('express');
const members = require('./data/member');
const logger = require('./middleware/logger');

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('<h1>Hello World!!!</h1>');
});

// Use the logger middleware
app.use(logger);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/members', require('./routes/api/routes'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));