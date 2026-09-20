import express from "express";
import {getComments, getComment, createComment, updateComment, deleteComment} from "../controllers/comments.js"
import bodyParser from 'body-parser';

export const commentsRouter = express.Router();
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

commentsRouter.get("/", getComments);
commentsRouter.get("/:id", getComment);
commentsRouter.post("/", jsonParser, createComment);
commentsRouter.post("/:id", jsonParser, updateComment);
commentsRouter.delete("/:id", deleteComment);