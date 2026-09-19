import express from "express";
import {getUsers, getUser, createUser, updateUser, deleteUser} from "../controllers/users.js"
import bodyParser from 'body-parser';

export const usersRouter = express.Router();
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUser);
usersRouter.post("/", jsonParser, createUser);
usersRouter.post("/:id", jsonParser, updateUser);
usersRouter.delete("/:id", deleteUser);
