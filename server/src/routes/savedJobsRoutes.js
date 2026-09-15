const express = require('express');
const router = express.Router();
const { getSavedJobs, saveJob, removeSavedJob } = require('../controllers/savedJobsController');
const protect = require('../middleware/authMiddleware');

// Every route in this file requires a valid token — no exceptions.
// Applying `protect` here, once, instead of on each individual route below.
router.use(protect);

router.get('/', getSavedJobs);
router.post('/', saveJob);
router.delete('/:id', removeSavedJob);

module.exports = router;