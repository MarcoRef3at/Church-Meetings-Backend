const allowCrossDomain = require("./middleware/cors");
const colors = require("colors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const express = require("express");
const errorHandler = require("./middleware/error");
const helmet = require("helmet");
const hpp = require("hpp");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

// Route Files
const users = require("./routes/users");
const auth = require("./routes/auth");
const permissions = require("./routes/permissions");
const records = require("./routes/records");

const app = express();

// Body Parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("common"));
}

// Add CORS middleware
app.use(allowCrossDomain);

// Set Security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //10 minutes
  max: 100, //100 requests per 10 minutes
});
app.use(limiter);

// Prevent Http param pollution
app.use(hpp());

// Mount Routers
app.use("/api/v2/users", users);
app.use("/api/v2/auth", auth);
app.use("/api/v2/permissions", permissions);
app.use("/api/v2/records", records);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
