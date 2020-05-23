const express = require('express');
require('./services/passport');
const authRoutes = require('./routes/authRoutes');

const app = express();

authRoutes(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('app running on port 3000');
});
