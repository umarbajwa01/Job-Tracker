const express = require('express');
const cors = require('cors');

const jobsRoutes = require('./routes/jobsRoutes');
const authRoutes = require('./routes/authRoutes');
const savedJobsRoutes = require('./routes/savedJobsRoutes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// Allow our React frontend (different port) to call this API.
app.use(cors());

// Parse incoming JSON request bodies into req.body.
app.use(express.json());

// Health check — confirms the server is alive.
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

// Mount each resource's routes at its base path.
app.use('/api/jobs', jobsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/saved-jobs', savedJobsRoutes);

// Catch any request that didn't match a route above.
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Must be registered LAST — catches errors from any route above.
app.use(errorHandler);

module.exports = app;