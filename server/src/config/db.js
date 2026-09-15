const { PrismaClient } = require('@prisma/client');

// Create a single, reusable Prisma Client instance for the whole app.
const prisma = new PrismaClient();

module.exports = prisma;