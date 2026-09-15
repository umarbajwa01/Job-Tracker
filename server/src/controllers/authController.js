const bcrypt = require("bcryptjs");
const prisma = require("../config/db");
const generateToken = require("../utils/generateToken");
const { asyncHandler,AppError } = require("../middleware/errorHandler");

// POST /api/auth/register
const register = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  // Basic input validation — fail fast with a clear error before touching the database.
  if (!email || !password || !name) {
    throw new AppError('Email, password, and name are all required', 400);
  }

  // Check whether this email is already registered.
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new AppError('An account with this email already exists', 409);
  }

  // Hash the password before storing it. 10 is the "salt rounds" —
  // higher is slower but more secure. 10 is a standard, safe default.
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  const token = generateToken(user.id);

  res.status(201).json({
    success: true,
    data: {
      user: { id: user.id, email: user.email, name: user.name },
      token,
    },
  });
});

// POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError('Email and password are required', 400);
  }

  const user = await prisma.user.findUnique({ where: { email } });

  // Deliberately vague error message — don't reveal whether the email
  // exists or the password was wrong. This prevents attackers from
  // using our error messages to figure out which emails are registered.
  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    throw new AppError('Invalid email or password', 401);
  }

  const token = generateToken(user.id);

  res.json({
    success: true,
    data: {
      user: { id: user.id, email: user.email, name: user.name },
      token,
    },
  });
});

module.exports = { register, login };