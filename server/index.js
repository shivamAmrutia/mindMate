const express = require('express');
const dotenv = require('dotenv');
const parseRoute = require('./routes/parse');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/parse', parseRoute);

const PORT = process.env.PORT || 5000;
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
