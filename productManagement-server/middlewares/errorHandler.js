
export default (err, req, res, next) => {
  console.error("Error:", err);

  // Known error (AppError)
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
  }

  // Unknown / unexpected error
  res.status(500).json({
    success: false,
    message: "Something went wrong! Please try again later."
  });
};
