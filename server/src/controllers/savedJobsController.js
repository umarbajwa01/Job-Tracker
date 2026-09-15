const prisma = require('../config/db');
const { asyncHandler, AppError } = require('../middleware/errorHandler');

// GET /api/saved-jobs
// Returns all jobs saved by the currently logged-in user.
const getSavedJobs = asyncHandler(async (req, res) => {
  const savedJobs = await prisma.savedJob.findMany({
    where: { userId: req.userId },
    orderBy: { savedAt: 'desc' },
  });

  res.json({ success: true, data: savedJobs });
});

// POST /api/saved-jobs
// Saves a job to the currently logged-in user's account.
const saveJob = asyncHandler(async (req, res) => {
  const { externalId, title, company, location, salaryMin, salaryMax, redirectUrl } = req.body;

  if (!externalId || !title || !company || !location || !redirectUrl) {
    throw new AppError('externalId, title, company, location, and redirectUrl are required', 400);
  }

  // Prevent saving the same job twice — matches our @@unique([userId, externalId])
  // constraint from the Prisma schema, but we check here first to give a
  // clear error message instead of a raw database error.
  const existing = await prisma.savedJob.findUnique({
    where: {
      userId_externalId: {
        userId: req.userId,
        externalId,
      },
    },
  });

  if (existing) {
    throw new AppError('You have already saved this job', 409);
  }

  const savedJob = await prisma.savedJob.create({
    data: {
      externalId,
      title,
      company,
      location,
      salaryMin: salaryMin || null,
      salaryMax: salaryMax || null,
      redirectUrl,
      userId: req.userId,
    },
  });

  res.status(201).json({ success: true, data: savedJob });
});

// DELETE /api/saved-jobs/:id
// Removes a saved job — only if it belongs to the currently logged-in user.
const removeSavedJob = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const savedJob = await prisma.savedJob.findUnique({ where: { id } });

  if (!savedJob) {
    throw new AppError('Saved job not found', 404);
  }

  // Critical security check: make sure the job belongs to the person
  // making the request, not just that a saved job with this id exists.
  if (savedJob.userId !== req.userId) {
    throw new AppError('Not authorized to remove this saved job', 403);
  }

  await prisma.savedJob.delete({ where: { id } });

  res.json({ success: true, message: 'Saved job removed' });
});

module.exports = { getSavedJobs, saveJob, removeSavedJob };