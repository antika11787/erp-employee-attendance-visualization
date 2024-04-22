import express from "express";
const dotenv = require("dotenv");
const { handleSyntaxError } = require("../utils/errorHandler");
const cors = require("cors");
const fileRoutes = require("../routes/fileRoutes");
const employeeRoutes = require("../routes/employeeRoutes");
const authRoutes = require("../routes/authRoutes");

dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(handleSyntaxError);

app.use("/file", fileRoutes);
app.use("/employee", employeeRoutes);
app.use("/auth", authRoutes);

export = app;
