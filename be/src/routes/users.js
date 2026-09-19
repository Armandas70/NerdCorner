import express from "express";
import {getUsers, getUser, deleteUser} from "../controllers/users.js"

export const usersRouter = express.Router();

usersRouter.get("/", getUsers);
usersRouter.get("/get/:id", getUser);
usersRouter.post("/delete/:id", deleteUser);
