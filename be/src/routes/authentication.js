import express from "express";
import {register, login, logout, refresh} from "../controllers/authentication.js"
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser"

export const authenticationRouter = express.Router();
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var cookiesParser = cookieParser()

authenticationRouter.post("/register", jsonParser, register);
authenticationRouter.post("/login", jsonParser, login);
authenticationRouter.post("/logout", jsonParser, logout);
authenticationRouter.post("/refresh", jsonParser, cookiesParser, refresh);