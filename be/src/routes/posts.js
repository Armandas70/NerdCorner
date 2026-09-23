import express from "express";
import {getPosts, getPost, createPost, updatePost, deletePost} from "../controllers/posts.js"
import bodyParser from 'body-parser';

export const postsRouter = express.Router();
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

postsRouter.get("/", getPosts);
postsRouter.get("/:id", getPost);
postsRouter.post("/", jsonParser, createPost);
postsRouter.patch("/:id", jsonParser, updatePost);
postsRouter.delete("/:id", deletePost);