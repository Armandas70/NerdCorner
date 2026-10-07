import express from "express";
import {getUsers, getUser, createUser, updateUser, deleteUser} from "../controllers/users.js"
import bodyParser from 'body-parser';
import {validateIsAdmin} from "../middleware/authorization.js"

export const usersRouter = express.Router();
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUser);
usersRouter.post("/", jsonParser, validateIsAdmin, createUser);
usersRouter.patch("/:id", jsonParser, validateIsAdmin, updateUser);
usersRouter.delete("/:id", validateIsAdmin, deleteUser);
