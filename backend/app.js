import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser"; // Ensure this is imported
import { dbConnection } from "./database/dbConnection.js";
import userRouter from "./router/userRouter.js";
import taskRouter from "./router/taskRouter.js";

// Initialize app
const app = express();

// Load environment variables before anything else
config({ path: "./config/config.env" });

// Middleware setup
app.use(express.json());
app.use(cookieParser()); // Ensure this is before any route that requires cookie parsing
app.use(express.urlencoded({ extended: true }));

// Database connection
dbConnection();

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);

// Default export
export default app;
