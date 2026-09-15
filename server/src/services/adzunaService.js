const ADZUNA_BASE_URL = 'https://api.adzuna.com/v1/api/jobs';

const searchJobs = async ({ what, where, page = 1, salaryMin, salaryMax }) => {
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;

  const params = new URLSearchParams({
    app_id: appId,
    app_key: appKey,
    results_per_page: '10',
  });

  if (what) params.append('what', what);
  if (where) params.append('where', where);
  if (salaryMin) params.append('salary_min', salaryMin);
  if (salaryMax) params.append('salary_max', salaryMax);

  const url = `${ADZUNA_BASE_URL}/gb/search/${page}?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Adzuna API request failed with status ${response.status}`);
  }

  const data = await response.json();

  return {
    results: data.results,
    count: data.count,
  };
};

module.exports = { searchJobs };