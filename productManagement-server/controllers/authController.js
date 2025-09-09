const jwt = require('jsonwebtoken');
const AppError = require('../middlewares/AppError').default;

// Admin login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validate inputs
  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  // Check against env credentials
  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
    throw new AppError("Invalid credentials", 401);
  }
   
  // Generate JWT
  const token = jwt.sign(
    { email: process.env.ADMIN_EMAIL },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({
    success: true,
    message: 'Login successful',
    token,
    user: { email: process.env.ADMIN_EMAIL }
  });
};
