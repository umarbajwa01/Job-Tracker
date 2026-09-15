// Load environment variables from .env before anything else runs.
// This must happen first so process.env has our values available.
require('dotenv').config();

const app = require('./src/app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});