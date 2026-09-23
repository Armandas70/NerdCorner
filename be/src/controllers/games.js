import { db, listAll, getOne, deleteOne } from "../database.js";

export const getGames = async (req, res) => {
    listAll(req, res, "games", 10, ["title", "created_at"]);
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
                            res.status(201).json(data);
                        })
                        .catch((error) => {
                            console.log('CREATE Game error:', error);
                            res.status(400).json({ message: "Bad request" });
                        });
                }
            })
            .catch((error) => {
                console.log('CREATE Game error:', error);
                res.status(400).json({ message: "Bad request" });
            });

    } catch (error) {
        console.error("CREATE Game error:", error);
        res.status(400).json({ message: "Bad request" });
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
                            res.status(400).json({ message: "Bad request" });
                        });
                }
            })
            .catch((error) => {
                console.log('UPDATE Game error:', error);
                res.status(400).json({ message: "Bad request" });
            });

    } catch (error) {
        console.error("UPDATE Game error:", error);
        res.status(400).json({ message: "Bad request" });
    }
};

export const getGamePostComments = async (req, res) => {
    const gameId = req.params.gameId;
    const postId = req.params.postId;

    // Constructs queries
    const getGameQuery = `select * from games where id = ${gameId}`;
    const getPostQuery = `select * from posts where id = ${postId} AND game_id = ${gameId}`;
    const getCommentsQuery = `select * from comments where post_id = ${postId}`

    // Checks if game id and post id are valid numbers
    if (isNaN(gameId)) {
        console.log("GET error:", `Invalid game id`);
        res.status(400).json({ message: "Invalid game id" });
        return;
    } else if (isNaN(postId)) {
        console.log("GET error:", `Invalid post id`);
        res.status(400).json({ message: "Invalid post id" });
        return;
    }

    try {
        // Checks if game with id exists
        db.oneOrNone(getGameQuery)
            .then((data) => {
                if (data == null) {
                    console.log("GET error:", `Game with id ${gameId} not found`);
                    res.status(404).json({ message: "Game not found" });
                } else {
                    // Checks if post with id (and game_id) exists
                    db.oneOrNone(getPostQuery)
                        .then((postData) => {
                            if (postData == null) {
                                console.log("GET error:", `Post with id ${postId} and game_id ${gameId} not found`);
                                res.status(404).json({ message: "Post not found" });
                            } else {
                                // Gets the comments
                                db.manyOrNone(getCommentsQuery)
                                    .then((commentsData) => {
                                        console.log(`GET results:`, commentsData);
                                        res.status(200).json({post: postData, comments: commentsData});
                                    })
                                    .catch((error) => {
                                        console.log(`GET error:`, error);
                                        res.status(400).json({ message: "Bad request" });
                                    });
                            }
                        })
                        .catch((error) => {
                            console.log('GET error:', error);
                            res.status(400).json({ message: "Bad request" });
                        });
                }
            })
            .catch((error) => {
                console.log(`GET error:`, error);
                res.status(400).json({ message: "Bad request" });
            });

    } catch (error) {
        console.error(`GET error:`, error);
        res.status(400).json({ message: "Bad request" });
    }
};