import express from "express";
import {getGames, getGame, createGame, updateGame, deleteGame, getGamePostComments} from "../controllers/games.js"
import bodyParser from 'body-parser';
import {validateIsAdmin} from "../middleware/authorization.js"

export const gamesRouter = express.Router();
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

gamesRouter.get("/", getGames);
gamesRouter.get("/:id", getGame);
gamesRouter.post("/", jsonParser, validateIsAdmin, createGame);
gamesRouter.patch("/:id", jsonParser, validateIsAdmin, updateGame);
gamesRouter.delete("/:id", validateIsAdmin, deleteGame);
gamesRouter.get("/:gameId/posts/:postId/comments", getGamePostComments);