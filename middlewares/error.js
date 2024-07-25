class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  // अगर त्रुटि एक स्ट्रिंग है, तो इसे ErrorHandler ऑब्जेक्ट में बदलें
  if (typeof err === 'string') {
    err = new ErrorHandler(err, 500);
  }

  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  if (err.name === "CastError") {
    const message = `Invalid: Resource not found: ${err.path}`;
    err = new ErrorHandler(message, 404);
  }

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorHandler;
