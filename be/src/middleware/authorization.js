import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { getUserByEmail } from "../database.js";
import { Int32 } from "typeorm";

dotenv.config();
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

export const validateJWT = async (req, res) => {
    const accessToken = req.cookies?.access_token;

    if (!accessToken) {
        return JSON.parse(`{ "status": "401", "message": "Unauthenticated" }`)
    }

    try {
        const decoded = jwt.verify(accessToken, JWT_ACCESS_SECRET);
        const user = await getUserByEmail(decoded.email);
        if (user == null) {
            return JSON.parse(`{ "status": "403", "message": "Forbidden: Invalid token" }`)
        }
        return user;
    } catch (error) {
        console.log("validateJWT error: ", error);
        return JSON.parse(`{ "status": "403", "message": "Forbidden: Invalid token" }`)
    }
};

export const validateIsAdmin = async (req, res, next) => {
    try {
        // Validates access token
        const result = await validateJWT(req, res);
        if (result?.message){
            return res.status(parseInt(result.status)).json({ message: result.message });
        }

        // Checks if user is admin
        if (!result.is_admin) {
            return res.status(403).json({ message: "Unauthorized: need to have admin privileges" });
        }
        next();
    } catch (error) {
        console.log("validateIsAdmin error: ", error);
        res.status(403).json({ message: "Unauthorized" });
        return;
    }
};