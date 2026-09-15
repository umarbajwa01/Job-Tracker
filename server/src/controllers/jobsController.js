const adzunaService = require('../services/adzunaService');
const { asyncHandler, AppError } = require('../middleware/errorHandler');

// GET /api/jobs/search?what=react&where=london&page=1&salaryMin=30000&salaryMax=60000
const searchJobs = asyncHandler(async (req, res) => {
  const { what, where, page, salaryMin, salaryMax } = req.query;

  if (!what) {
    throw new AppError('A search term ("what") is required', 400);
  }

  const data = await adzunaService.searchJobs({ what, where, page, salaryMin, salaryMax });

  const formattedJobs = data.results.map((job) => ({
    id: job.id,
    title: job.title,
    company: job.company?.display_name || 'Unknown company',
    location: job.location?.display_name || 'Location not specified',
    salaryMin: job.salary_min || null,
    salaryMax: job.salary_max || null,
    description: job.description,
    redirectUrl: job.redirect_url,
    category: job.category?.label || null,
    createdAt: job.created,
  }));

  res.json({
    success: true,
    count: data.count,
    data: formattedJobs,
  });
});

module.exports = { searchJobs };