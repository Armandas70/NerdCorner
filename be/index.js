import express from "express";
import cors from "cors";
import {db} from "./src/database.js";
import {usersRouter} from "./src/routes/users.js";
import {gamesRouter} from "./src/routes/games.js";
import {postsRouter} from "./src/routes/posts.js";
import {commentsRouter} from "./src/routes/comments.js";
import {authenticationRouter} from "./src/routes/authentication.js";
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";

// BE and FE Ports
const PORT_BE = 3000;
const PORT_FE = 5173

// CORS Setup
const allowedOrigins = [
  `http://localhost:${PORT_BE}`,
  `http://localhost:${PORT_FE}`,
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};


// APP Configuration
const app = express();
app.use(cors(corsOptions))
db.connect();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());

app.use("/users", usersRouter);
app.use("/games", gamesRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use("/auth", authenticationRouter);

app.get("/", (req, res) => {
  res.send("Welcome to NerdCorner!");
});

app.listen(PORT_BE, () => {
  console.log(`Server is running on http://localhost:${PORT_BE}`);
});