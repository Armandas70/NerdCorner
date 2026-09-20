import express from "express";
import {db} from "./src/database.js";
import {usersRouter} from "./src/routes/users.js";
import {gamesRouter} from "./src/routes/games.js";
import {postsRouter} from "./src/routes/posts.js";
import {commentsRouter} from "./src/routes/comments.js";
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;
db.connect();

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