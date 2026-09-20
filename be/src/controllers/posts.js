import { db } from "../../index.js";

// === FOR LATER ===

// export const getPosts = async (req, res) => {
//     const gameId = req.params.gameId;
//     const getGameQuery = `select * from games where id = ${gameId}`;
//     const getPostsQuery = `select * from posts where game_id = ${gameId}`;

//     // Checks if game id is a valid number
//     if (isNaN(gameId)) {
//         console.log("GET Posts error:", `Invalid game id = ${gameId}`);
//         res.status(400).json({ message: "Invalid game id" });
//         return;
//     }

//     try {
//         // Checks if game with game id exists
//         db.oneOrNone(getGameQuery)
//             .then((data) => {
//                 if (data == null) {
//                     console.log("GET Posts error:", `Game with id ${gameId} not found`);
//                     res.status(404).json({ message: "Game not found" });
//                 } else {
//                     // Tries to get the game's posts (if game exists)
//                     db.query(getPostsQuery)
//                         .then((data) => {
//                             console.log('GET Posts results:', data);
//                             res.status(200).json(data);
//                         })
//                         .catch((error) => {
//                             console.log('GET Posts error:', error);
//                             res.status(500).json({ message: "Server error" });
//                         });
//                 }
//             })
//             .catch((error) => {
//                 console.log('GET Posts error:', error);
//                 res.status(500).json({ message: "Server error" });
//             });

//     } catch (error) {
//         console.error("GET Posts error:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };

export const getPosts = async (req, res) => {
    const query = "select * from posts"
    try {
        db.manyOrNone(query)
            .then((data) => {
                console.log('GET Posts results:', data);
                res.status(200).json(data);
            })
            .catch((error) => {
                console.log('GET Posts error:', error);
                res.status(500).json({ message: "Server error" });
            });

    } catch (error) {
        console.error("GET Posts error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getPost = async (req, res) => {
    const id = req.params.id;
    const query = (`select * from posts where id = ${id}`);

    // Checks if id is a valid number
    if (isNaN(id)) {
        console.log("GET Post error:", `Invalid id`);
        res.status(400).json({ message: "Invalid id" });
        return;
    }

    try {
        db.oneOrNone(query)
            .then((data) => {
                if (data == null) {
                    console.log("GET Post error:", `Post with id ${id} not found`);
                    res.status(404).json({ message: "Post not found" });
                } else {
                    console.log('GET Post results:', data);
                    res.status(200).json(data);
                }
            })
            .catch((error) => {
                console.log('GET Post error:', error);
                res.status(500).json({ message: "Server error" });
            });

    } catch (error) {
        console.error("GET Post error:", error);
        res.status(500).json({ message: "Server error" });
    }
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
                    res.status(400).json({ message: "Game not found" });
                } else {
                    // Tries to create the post
                    db.query(createQuery)
                        .then((data) => {
                            console.log('CREATE Post results:', data);
                            res.status(200).json(data);
                        })
                        .catch((error) => {
                            console.log('CREATE Post error:', error);
                            res.status(500).json({ message: "Server error" });
                        });
                }
            })
            .catch((error) => {
                console.log('CREATE Post error:', error);
                res.status(500).json({ message: "Server error" });
            });

    } catch (error) {
        console.error("CREATE Post error:", error);
        res.status(500).json({ message: "Server error" });
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
                    res.status(400).json({ message: "Post not found" });
                } else {
                    // Tries to update the post (if it exists)
                    db.query(updateQuery)
                        .then((data) => {
                            console.log('UPDATE Post results:', data);
                            res.status(200).json(data);
                        })
                        .catch((error) => {
                            console.log('UPDATE Post error:', error);
                            res.status(500).json({ message: "Server error" });
                        });
                }
            })
            .catch((error) => {
                console.log('UPDATE Post error:', error);
                res.status(500).json({ message: "Server error" });
            });

    } catch (error) {
        console.error("UPDATE Post error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const deletePost = async (req, res) => {
    const id = req.params.id;
    const getQuery = (`select * from posts where id = ${id}`);
    const deleteQuery = (`delete from posts where id = ${id}`);

    // Checks if id is a valid number
    if (isNaN(id)) {
        console.log("DELETE Post error:", `Invalid id`);
        res.status(400).json({ message: "Invalid id" });
        return;
    }

    try {
        // Checks if post with id exists
        db.oneOrNone(getQuery)
            .then((data) => {
                if (data == null) {
                    console.log("DELETE Post error:", `Post with id ${id} not found`);
                    res.status(404).json({ message: "Post not found" });
                } else {
                    // Tries to delete the post with id (if post exists)
                    db.query(deleteQuery)
                        .then((data) => {
                            console.log('DELETE Post results:', data);
                            res.status(200).json(data);
                        })
                        .catch((error) => {
                            console.log('DELETE Post error:', error);
                            res.status(500).json({ message: "Server error" });
                        });
                }
            })
            .catch((error) => {
                console.log('DELETE Post error:', error);
                res.status(500).json({ message: "Server error" });
            });

    } catch (error) {
        console.error("DELETE Post error:", error);
        res.status(500).json({ message: "Server error" });
    }
};