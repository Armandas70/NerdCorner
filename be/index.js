//const express = require("express");
import express from "express";
import pgp from 'pg-promise';
import dotenv from 'dotenv';
import {usersRouter} from "./src/routes/users.js";
import {gamesRouter} from "./src/routes/games.js";
import {postsRouter} from "./src/routes/posts.js";
import {commentsRouter} from "./src/routes/comments.js";
import bodyParser from 'body-parser';

dotenv.config();
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
app.use("/games", gamesRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});