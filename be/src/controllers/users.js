import { db } from "../../index.js";

export const getUsers = async (req, res) => {
    const query = "select * from users"
    try {
        db.manyOrNone(query)
            .then((data) => {
                console.log('GET Users results:', data);
                res.status(200).json(data);
            })
            .catch((error) => {
                console.log('GET Users error:', error);
                res.status(500).json({ message: "Server error" });
            });

    } catch (error) {
        console.error("GET Users error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getUser = async (req, res) => {
    const id = req.params.id;
    const query = (`select * from users where id = ${id}`);

    // Checks if id is a valid number
    if (isNaN(id)) {
        console.log("GET User error:", `Invalid id`);
        res.status(400).json({ message: "Invalid id" });
        return;
    }

    try {
        db.oneOrNone(query)
            .then((data) => {
                if (data == null) {
                    console.log("GET User error:", `User with id ${id} not found`);
                    res.status(404).json({ message: "User not found" });
                } else {
                    console.log('GET User results:', data);
                    res.status(200).json(data);
                }
            })
            .catch((error) => {
                console.log('GET User error:', error);
                res.status(500).json({ message: "Server error" });
            });

    } catch (error) {
        console.error("GET User error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const createUser = async (req, res) => {
    const body = req.body;

    // Checks if all fields are defined (and not empty)
    if (body == null || body.username == null || body.email == null || body["\"password\""] == null) {
        console.log("CREATE User error:", `None of these fields can be left empty: username, email, password`);
        res.status(400).json({ message: "None of these fields can be left empty: username, email, password" })
        return;
    } else if (body.username == "" || body.email == "" || body["\"password\""] == "") {
        console.log("CREATE User error:", `None of these fields can be left empty: username, email, password`);
        res.status(400).json({ message: "None of these fields can be left empty: username, email, password" })
        return;
    }

    // Constructs queries
    const username = body.email;
    const email = body.email;
    const pass = body["\"password\""];

    const getQuery = (`select * from users where email = '${email}'`);
    const createQuery = (
        `INSERT INTO users
        (username, email, "password")
        VALUES('${username}', '${email}', '${pass}');`
    );

    try {
        // Checks if user with email already exists
        db.oneOrNone(getQuery)
            .then((data) => {
                if (data != null) {
                    console.log("CREATE User error:", `Account with email ${email} already exists`);
                    res.status(400).json({ message: "Account with this email already exists" });
                } else {
                    // Tries to create the user
                    db.query(createQuery)
                        .then((data) => {
                            console.log('CREATE User results:', data);
                            res.status(200).json(data);
                        })
                        .catch((error) => {
                            console.log('CREATE User error:', error);
                            res.status(500).json({ message: "Server error" });
                        });
                }
            })
            .catch((error) => {
                console.log('CREATE User error:', error);
                res.status(500).json({ message: "Server error" });
            });

    } catch (error) {
        console.error("CREATE User error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const updateUser = async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    // Checks if id is a valid number
    if (isNaN(id)) {
        console.log("UPDATE User error:", `Invalid id`);
        res.status(400).json({ message: "Invalid id" });
        return;
    }

    // Checks if all fields are defined (and not empty)
    if (body == null || body.username == null || body["\"password\""] == null) {
        console.log("UPDATE User error:", `None of these fields can be left empty: username, password`);
        res.status(400).json({ message: "None of these fields can be left empty: username, password" })
        return;
    } else if (body.username == "" || body["\"password\""] == "") {
        console.log("UPDATE User error:", `None of these fields can be left empty: username, password`);
        res.status(400).json({ message: "None of these fields can be left empty: username, password" })
        return;
    }

    // Constructs queries
    const username = body.username;
    const pass = body["\"password\""];

    const getQuery = (`select * from users where id = '${id}'`);
    const updateQuery = (
        `UPDATE users
        SET username = '${username}', \"password\" = '${pass}'
        WHERE id = ${id};`
    );

    try {
        // Checks if user with id exists
        db.oneOrNone(getQuery)
            .then((data) => {
                if (data == null) {
                    console.log("UPDATE User error:", `User with id ${id} not found`);
                    res.status(404).json({ message: "User not found" });
                } else {
                    // Tries to update the user (if it exists)
                    db.query(updateQuery)
                        .then((data) => {
                            console.log('UPDATE User results:', data);
                            res.status(200).json(data);
                        })
                        .catch((error) => {
                            console.log('UPDATE User error:', error);
                            res.status(500).json({ message: "Server error" });
                        });
                }
            })
            .catch((error) => {
                console.log('UPDATE User error:', error);
                res.status(500).json({ message: "Server error" });
            });

    } catch (error) {
        console.error("UPDATE User error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteUser = async (req, res) => {
    const id = req.params.id;
    const getQuery = (`select * from users where id = ${id}`);
    const deleteQuery = (`delete from users where id = ${id}`);

    // Checks if id is a valid number
    if (isNaN(id)) {
        console.log("DELETE User error:", `Invalid id`);
        res.status(400).json({ message: "Invalid id" });
        return;
    }

    try {
        // Checks if user with id exists
        db.oneOrNone(getQuery)
            .then((data) => {
                if (data == null) {
                    console.log("DELETE User error:", `User with id ${id} not found`);
                    res.status(404).json({ message: "User not found" });
                } else {
                    // Tries to delete the user with id (if user exists)
                    db.query(deleteQuery)
                        .then((data) => {
                            console.log('DELETE User results:', data);
                            res.status(200).json(data);
                        })
                        .catch((error) => {
                            console.log('DELETE User error:', error);
                            res.status(500).json({ message: "Server error" });
                        });
                }
            })
            .catch((error) => {
                console.log('DELETE User error:', error);
                res.status(500).json({ message: "Server error" });
            });

    } catch (error) {
        console.error("DELETE User error:", error);
        res.status(500).json({ message: "Server error" });
    }
};