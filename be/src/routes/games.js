import express from "express";
import {getGames, getGame, createGame, updateGame, deleteGame} from "../controllers/games.js"
import bodyParser from 'body-parser';

export const gamesRouter = express.Router();
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

gamesRouter.get("/", getGames);
gamesRouter.get("/:id", getGame);
gamesRouter.post("/", jsonParser, createGame);
gamesRouter.post("/:id", jsonParser, updateGame);
gamesRouter.delete("/:id", deleteGame);