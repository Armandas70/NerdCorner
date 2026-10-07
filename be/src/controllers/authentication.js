import { db } from "../database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export const register = async (req, res) => {
    const body = req.body;

    // Checks if all fields are defined (and not empty)
    if (body == null || body.username == null || body.email == null || body.password == null) {
        console.log("Register error:", `None of these fields can be left empty: username, email, password`);
        res.status(400).json({ message: "None of these fields can be left empty: username, email, password" })
        return;
    } else if (body.username == "" || body.email == "" || body.password == "") {
        console.log("Register error:", `None of these fields can be left empty: username, email, password`);
        res.status(400).json({ message: "None of these fields can be left empty: username, email, password" })
        return;
    }

    // Constructs queries
    const username = body.username;
    const email = body.email;
    const pass = body.password;
    const hashedPass = await bcrypt.hash(pass, 10)

    const getQuery = (`select * from users where email = '${email}'`);
    const createQuery = (
        `INSERT INTO users
        (username, email, "password")
        VALUES('${username}', '${email}', '${hashedPass}');`
    );

    try {
        // Checks if user with email already exists
        db.oneOrNone(getQuery)
            .then((data) => {
                if (data != null) {
                    console.log("Register error:", `Account with email ${email} already exists`);
                    res.status(400).json({ message: "Account with this email already exists" });
                } else {
                    // Tries to create the user
                    db.query(createQuery)
                        .then((data) => {
                            // Creates JWT access token
                            const accessToken = jwt.sign({ email: email }, JWT_ACCESS_SECRET, {
                                expiresIn: "5m",
                            });
                            res.cookie('access_token', accessToken, {
                                httpOnly: true,
                                sameSite: 'Lax', secure: true,
                                maxAge: 24 * 60 * 60 * 1000
                            });

                            // Creates JWT refresh token
                            const refreshToken = jwt.sign({ email: email }, JWT_REFRESH_SECRET, {
                                expiresIn: "1d",
                            });
                            res.cookie('refresh_token', refreshToken, {
                                httpOnly: true,
                                sameSite: 'Lax', secure: true,
                                maxAge: 24 * 60 * 60 * 1000
                            });

                            console.log('Register results:', data);
                            res.status(201).json({ message: "User registered successfully", token: accessToken });
                        })
                        .catch((error) => {
                            console.log('Register error:', error);
                            res.status(400).json({ message: "Bad request" });
                        });
                }
            })
            .catch((error) => {
                console.log('Register error:', error);
                res.status(400).json({ message: "Bad request" });
            });

    } catch (error) {
        console.error("Register error:", error);
        res.status(400).json({ message: "Bad request" });
    }
};

export const login = async (req, res) => {
    const body = req.body;

    // Checks if all fields are defined (and not empty)
    if (body == null || body.email == null || body.password == null) {
        console.log("Login error:", `None of these fields can be left empty: email, password`);
        res.status(400).json({ message: "None of these fields can be left empty: email, password" })
        return;
    } else if (body.email == "" || body.password == "") {
        console.log("Login error:", `None of these fields can be left empty: email, password`);
        res.status(400).json({ message: "None of these fields can be left empty: email, password" })
        return;
    }

    // Constructs queries
    const email = body.email;
    const pass = body.password;

    const getQuery = (`select * from users where email = '${email}'`);

    try {
        // Checks if a user with given credentials exists
        db.oneOrNone(getQuery)
            .then((data) => {
                if (data != null) {
                    // Checks if the hashed input password matches the stored hashed password
                    const isMatching = bcrypt.compareSync(pass, data.password);
                    if (!isMatching) {
                        res.status(401).json({ message: "Incorrect email or password" });
                        return;
                    }

                    // Creates JWT access token
                    const accessToken = jwt.sign({ email: data.email }, JWT_ACCESS_SECRET, {
                        expiresIn: "5m",
                    });
                    res.cookie('access_token', accessToken, {
                        httpOnly: true,
                        sameSite: 'Lax', secure: true,
                        maxAge: 24 * 60 * 60 * 1000
                    });

                    // Creates JWT refresh token
                    const refreshToken = jwt.sign({ email: data.email }, JWT_REFRESH_SECRET, {
                        expiresIn: "1d",
                    });
                    res.cookie('refresh_token', refreshToken, {
                        httpOnly: true,
                        sameSite: 'Lax', secure: true,
                        maxAge: 24 * 60 * 60 * 1000
                    });

                    console.log('Login results:', data);
                    res.status(200).json({ message: "User logged in successfully", accessToken });
                } else {
                    console.log('Login error:', data);
                    res.status(401).json({ message: "Incorrect email or password" });
                }
            })
            .catch((error) => {
                console.log('Login error:', error);
                res.status(400).json({ message: "Bad request" });
            });

    } catch (error) {
        console.error("Login error:", error);
        res.status(400).json({ message: "Bad request" });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.log("Logout error", error);
        res.status(400).json({ message: "Bad request" });
    }
}

export const refresh = async (req, res) => {
    // Checks if cookies are defined and have refresh_token key
    if (req.cookies?.refresh_token) {

        // Destructues refreshToken from cookie
        const refreshToken = req.cookies.refresh_token;

        // Verifies refresh token
        jwt.verify(refreshToken, JWT_REFRESH_SECRET,
            (err, decoded) => {
                if (err) {
                    // Wrong Refesh Token
                    console.log('Refresh error (Wrong token):', err);
                    return res.status(406).json({ message: 'Unauthorized' });
                }
                else {
                    // Correct token - creates new access token
                    const accessToken = jwt.sign({ email: decoded.email }, JWT_ACCESS_SECRET, {
                        expiresIn: "5m",
                    });
                    res.cookie('access_token', accessToken, {
                        httpOnly: true,
                        sameSite: 'Lax', secure: true,
                        maxAge: 24 * 60 * 60 * 1000
                    });

                    console.log('Refresh results:', accessToken);
                    return res.status(200).json({ token: accessToken });
                }
            })
    } else {
        console.log('Refresh error:', req.cookies);
        return res.status(406).json({ message: 'Unauthorized' });
    }
}