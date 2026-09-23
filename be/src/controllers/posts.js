import { db, listAll, getOne, deleteOne } from "../database.js";

export const getPosts = async (req, res) => {
    listAll(req, res, "posts", 5, ["title", "created_at"]);
};

export const getPost = async (req, res) => {
    getOne(req, res, "posts", "Post");
};

export const deletePost = async (req, res) => {
    deleteOne(req, res, "posts", "Post");
};

export const createPost = async (req, res) => {
    const body = req.body;

    // Checks if all fields are defined (and not empty)
    if (body == null || body.title == null || body.description == null) {
        console.log("CREATE Post error:", `None of these fields can be left empty: title, description`);
        res.status(400).json({ message: "None of these fields can be left empty: title, description" })
        return;
    } else if (body.title == "" || body.description == "") {
        console.log("CREATE Post error:", `None of these fields can be left empty: title, description`);
        res.status(400).json({ message: "None of these fields can be left empty: title, description" })
        return;
    }

    // Constructs queries
    const title = body.title;
    const description = body.description;
    const gameId = body.gameId;
    const creatorId = body.creatorId;

    const getGameQuery = (`select * from games where id = '${gameId}'`);
    const createQuery = (
        `INSERT INTO posts
        (title, description, created_at, creator_id, game_id)
        VALUES('${title}', '${description}', CURRENT_DATE, ${creatorId}, ${gameId});`
    );

    try {
        // Checks if game with id exists
        db.oneOrNone(getGameQuery)
            .then((data) => {
                if (data == null) {
                    console.log("CREATE Post error:", `Game with id ${gameId} not found`);
                    res.status(404).json({ message: "Game not found" });
                } else {
                    // Tries to create the post
                    db.query(createQuery)
                        .then((data) => {
                            console.log('CREATE Post results:', data);
                            res.status(201).json(data);
                        })
                        .catch((error) => {
                            console.log('CREATE Post error:', error);
                            res.status(400).json({ message: "Bad request" });
                        });
                }
            })
            .catch((error) => {
                console.log('CREATE Post error:', error);
                res.status(400).json({ message: "Bad request" });
            });

    } catch (error) {
        console.error("CREATE Post error:", error);
        res.status(400).json({ message: "Bad request" });
    }
};

export const updatePost = async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    // Checks if id is a valid number
    if (isNaN(id)) {
        console.log("UPDATE Post error:", `Invalid id`);
        res.status(400).json({ message: "Invalid id" });
        return;
    }
 
    // Checks if all fields are defined (and not empty)
    if (body == null || body.title == null || body.description == null) {
        console.log("UPDATE Post error:", `None of these fields can be left empty: title, description`);
        res.status(400).json({ message: "None of these fields can be left empty: title, description" })
        return;
    } else if (body.title == "" || body.description == "") {
        console.log("UPDATE Post error:", `None of these fields can be left empty: title, description`);
        res.status(400).json({ message: "None of these fields can be left empty: title, description" })
        return;
    }

    // Constructs queries
    const title = body.title;
    const description = body.description;

    const getQuery = (`select * from posts where id = '${id}'`);
    const updateQuery = (
        `UPDATE posts
        SET title = '${title}', description = '${description}', is_edited = true
        WHERE id = ${id};`
    );

    try {
        // Checks if post with id exists
        db.oneOrNone(getQuery)
            .then((data) => {
                if (data == null) {
                    console.log("UPDATE Post error:", `Post with id ${id} not found`);
                    res.status(404).json({ message: "Post not found" });
                } else {
                    // Tries to update the post (if it exists)
                    db.query(updateQuery)
                        .then((data) => {
                            console.log('UPDATE Post results:', data);
                            res.status(200).json(data);
                        })
                        .catch((error) => {
                            console.log('UPDATE Post error:', error);
                            res.status(400).json({ message: "Bad request" });
                        });
                }
            })
            .catch((error) => {
                console.log('UPDATE Post error:', error);
                res.status(400).json({ message: "Bad request" });
            });

    } catch (error) {
        console.error("UPDATE Post error:", error);
        res.status(400).json({ message: "Bad request" });
    }
};
