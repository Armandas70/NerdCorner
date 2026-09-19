//const express = require("express");
import express from "express";
import pgp from 'pg-promise';
import dotenv from 'dotenv';
dotenv.config();
import {usersRouter} from "./src/routes/users.js";
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

const connection = {
    host: 'localhost',
    port: 5432,
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
};
export const db = pgp()(connection);

app.use(bodyParser.urlencoded({ extended: true}));

app.use("/users", usersRouter);
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});