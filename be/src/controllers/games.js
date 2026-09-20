import { db, listAll, getOne, deleteOne } from "../database.js";

export const getGames = async (req, res) => {
    listAll(req, res, "games");
};

export const getGame = async (req, res) => {
    getOne(req, res, "games", "Game");
};

export const deleteGame = async (req, res) => {
    deleteOne(req, res, "games", "Game");
};

export const createGame = async (req, res) => {
    const body = req.body;

    // Checks if all fields are defined (and not empty)
    if (body == null || body.title == null || body.description == null) {
        console.log("CREATE Game error:", `None of these fields can be left empty: title, description`);
        res.status(400).json({ message: "None of these fields can be left empty: title, description" })
        return;
    } else if (body.title == "" || body.description == "") {
        console.log("CREATE Game error:", `None of these fields can be left empty: title, description`);
        res.status(400).json({ message: "None of these fields can be left empty: title, description" })
        return;
    }

    // Constructs queries
    const title = body.title;
    const description = body.description;

    const getQuery = (`select * from games where title = '${title}'`);
    const createQuery = (
        `INSERT INTO games
        (title, description, created_at)
        VALUES('${title}', '${description}', CURRENT_DATE);`
    );

    try {
        // Checks if game with title already exists
        db.oneOrNone(getQuery)
            .then((data) => {
                if (data != null) {
                    console.log("CREATE Game error:", `Game with title ${title} already exists`);
                    res.status(400).json({ message: "Game with this title already exists" });
                } else {
                    // Tries to create the game
                    db.query(createQuery)
                        .then((data) => {
                            console.log('CREATE Game results:', data);
                            res.status(200).json(data);
                        })
                        .catch((error) => {
                            console.log('CREATE Game error:', error);
                            res.status(500).json({ message: "Server error" });
                        });
                }
            })
            .catch((error) => {
                console.log('CREATE Game error:', error);
                res.status(500).json({ message: "Server error" });
            });

    } catch (error) {
        console.error("CREATE Game error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const updateGame = async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    // Checks if id is a valid number
    if (isNaN(id)) {
        console.log("UPDATE Game error:", `Invalid id`);
        res.status(400).json({ message: "Invalid id" });
        return;
    }

    // Checks if all fields are defined (and not empty)
    if (body == null || body.title == null || body.description == null) {
        console.log("UPDATE Game error:", `None of these fields can be left empty: title, description`);
        res.status(400).json({ message: "None of these fields can be left empty: title, description" })
        return;
    } else if (body.title == "" || body.description == "") {
        console.log("UPDATE Game error:", `None of these fields can be left empty: title, description`);
        res.status(400).json({ message: "None of these fields can be left empty: title, description" })
        return;
    }

    // Constructs queries
    const title = body.title;
    const description = body.description;

    const getQuery = (`select * from games where id = '${id}'`);
    const updateQuery = (
        `UPDATE games
        SET title = '${title}', description = '${description}'
        WHERE id = ${id};`
    );

    try {
        // Checks if game with id exists
        db.oneOrNone(getQuery)
            .then((data) => {
                if (data == null) {
                    console.log("UPDATE Game error:", `Game with id ${id} not found`);
                    res.status(404).json({ message: "Game not found" });
                } else {
                    // Tries to update the game (if it exists)
                    db.query(updateQuery)
                        .then((data) => {
                            console.log('UPDATE Game results:', data);
                            res.status(200).json(data);
                        })
                        .catch((error) => {
                            console.log('UPDATE Game error:', error);
                            res.status(500).json({ message: "Server error" });
                        });
                }
            })
            .catch((error) => {
                console.log('UPDATE Game error:', error);
                res.status(500).json({ message: "Server error" });
            });

    } catch (error) {
        console.error("UPDATE Game error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

