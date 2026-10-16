import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { getUserByEmail, db } from "../database.js";

dotenv.config();
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export const validateAccessToken = async (req, res) => {
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
        console.log("validateAccessToken error: ", error);
        return JSON.parse(`{ "status": "403", "message": "Forbidden: Invalid token" }`)
    }
};

export const validateRefreshToken = async (req, res) => {
    const accessToken = req.cookies?.access_token;
    const refreshToken = req.cookies?.refresh_token;

    // Checks if tokens are in cookies
    if (!accessToken) {
        return JSON.parse(`{ "status": "401", "message": "Unauthenticated" }`)
    } else if (!refreshToken) {
        return JSON.parse(`{ "status": "403", "message": "Unauthorized" }`)
    }

    try {
        // Verifies if refresh token is valid
        jwt.verify(refreshToken, JWT_REFRESH_SECRET);

        // Gets user's email from access token
        const decoded = jwt.decode(accessToken);
        //console.log("DECODED: ", decoded);

        // Validates refresh token via DB
        const result = await findRefreshToken(refreshToken, decoded.email)
        if (result == null) {
            return JSON.parse(`{ "status": "406", "message": "Forbidden: Invalid refresh token" }`)
        }
        return decoded;

    } catch (error) {
        console.log("validateRefreshToken error: ", error);
        return JSON.parse(`{ "status": "403", "message": "Unauthorized" }`);
    }
};

export const validateIsAdmin = async (req, res, next) => {
    try {
        // Validates access token
        const result = await validateAccessToken(req, res);
        if (result?.message) {
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


// Helpers
export const findRefreshToken = async (token, email) => {
    const query = (`select * from tokens where refresh_token = '${token}' AND email ='${email}'`);

    return new Promise((resolve, reject) => {
        try {
            db.oneOrNone(query)
                .then((data) => {
                    // Checks if refresh token exists and belongs to this user
                    if (data == null) {
                        console.log(`GET RefreshToken error:`, `Token with token ${token} not found`);
                        resolve(data);
                    } else {
                        // Returns refresh token (if it exists)
                        console.log(`GET User results:`, data);
                        resolve(data);
                    }
                })
                .catch((error) => {
                    console.log(`GET RefreshToken error:`, error);
                    reject(error)
                });

        } catch (error) {
            console.error(`GET RefreshToken error:`, error);
            reject(error)
        }
    });
}

export const uploadRefreshToken = async (token, email) => {
    const query = (
        `UPSERT INTO tokens
        (email, token)
        VALUES('${email}', '${token}');`
    )

    return new Promise((resolve, reject) => {
        try {
            db.query(query)
                .then((data) => {
                    console.log('UPLOAD RefreshToken results:', data);
                    resolve(data);
                })
                .catch((error) => {
                    console.log(`UPLOAD RefreshToken error:`, error);
                    reject(error)
                });

        } catch (error) {
            console.error(`UPLOAD RefreshToken error:`, error);
            reject(error)
        }
    });
}

export const deleteRefreshToken = async (refreshToken) => {
    const query = (`DELETE from tokens WHERE refresh_token = '${refreshToken}'`)

    return new Promise((resolve, reject) => {
        try {
            db.query(query)
                .then((data) => {
                    console.log('DELETE RefreshToken results:', data);
                    resolve(data);
                })
                .catch((error) => {
                    console.log(`DELETE RefreshToken error:`, error);
                    reject(error)
                });

        } catch (error) {
            console.error(`DELETE RefreshToken error:`, error);
            reject(error)
        }
    });
}