import { db } from "../../index.js";

export const getComments = async (req, res) => {
    const query = "select * from comments"
    try {
        db.manyOrNone(query)
            .then((data) => {
                console.log('GET Comments results:', data);
                res.status(200).json(data);
            })
            .catch((error) => {
                console.log('GET Comments error:', error);
                res.status(500).json({ message: "Server error" });
            });

    } catch (error) {
        console.error("GET Comments error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getComment = async (req, res) => {
    const id = req.params.id;
    const query = (`select * from comments where id = ${id}`);

    // Checks if id is a valid number
    if (isNaN(id)) {
        console.log("GET Comment error:", `Invalid id`);
        res.status(400).json({ message: "Invalid id" });
        return;
    }

    try {
        db.oneOrNone(query)
            .then((data) => {
                if (data == null) {
                    console.log("GET Comment error:", `Comment with id ${id} not found`);
                    res.status(404).json({ message: "Comment not found" });
                } else {
                    console.log('GET Comment results:', data);
                    res.status(200).json(data);
                }
            })
            .catch((error) => {
                console.log('GET Comment error:', error);
                res.status(500).json({ message: "Server error" });
            });

    } catch (error) {
        console.error("GET Comment error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const createComment = async (req, res) => {
    const body = req.body;

    // Checks if all fields are defined (and not empty)
    if (body == null || body.content == null) {
        console.log("CREATE Comment error:", `None of these fields can be left empty: content`);
        res.status(400).json({ message: "None of these fields can be left empty: content" })
        return;
    } else if (body.content == "") {
        console.log("CREATE Comment error:", `None of these fields can be left empty: content`);
        res.status(400).json({ message: "None of these fields can be left empty: content" })
        return;
    }

    // Constructs queries
    const content = body.content;
    const postId = body.postId;
    const creatorId = body.creatorId;

    const getPostQuery = (`select * from posts where id = '${postId}'`);
    const createQuery = (
        `INSERT INTO comments
        (content, created_at, creator_id, post_id)
        VALUES('${content}', CURRENT_DATE, ${creatorId}, ${postId});`
    );

    try {
        // Checks if post with id exists
        db.oneOrNone(getPostQuery)
            .then((data) => {
                if (data == null) {
                    console.log("CREATE Comment error:", `Post with id ${postId} not found`);
                    res.status(400).json({ message: "Post not found" });
                } else {
                    // Tries to create the comment
                    db.query(createQuery)
                        .then((data) => {
                            console.log('CREATE Comment results:', data);
                            res.status(200).json(data);
                        })
                        .catch((error) => {
                            console.log('CREATE Comment error:', error);
                            res.status(500).json({ message: "Server error" });
                        });
                }
            })
            .catch((error) => {
                console.log('CREATE Comment error:', error);
                res.status(500).json({ message: "Server error" });
            });

    } catch (error) {
        console.error("CREATE Comment error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const updateComment = async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    // Checks if id is a valid number
    if (isNaN(id)) {
        console.log("UPDATE Comment error:", `Invalid id`);
        res.status(400).json({ message: "Invalid id" });
        return;
    }
 
    // Checks if all fields are defined (and not empty)
    if (body == null || body.content == null) {
        console.log("UPDATE Comment error:", `None of these fields can be left empty: content`);
        res.status(400).json({ message: "None of these fields can be left empty: content" })
        return;
    } else if (body.content == "") {
        console.log("UPDATE Comment error:", `None of these fields can be left empty: content`);
        res.status(400).json({ message: "None of these fields can be left empty: content" })
        return;
    }

    // Constructs queries
    const content = body.content;

    const getQuery = (`select * from comments where id = '${id}'`);
    const updateQuery = (
        `UPDATE comments
        SET content = '${content}', is_edited = true
        WHERE id = ${id};`
    );

    try {
        // Checks if comment with id exists
        db.oneOrNone(getQuery)
            .then((data) => {
                if (data == null) {
                    console.log("UPDATE Comment error:", `Comment with id ${id} not found`);
                    res.status(400).json({ message: "Comment not found" });
                } else {
                    // Tries to update the comment (if it exists)
                    db.query(updateQuery)
                        .then((data) => {
                            console.log('UPDATE Comment results:', data);
                            res.status(200).json(data);
                        })
                        .catch((error) => {
                            console.log('UPDATE Comment error:', error);
                            res.status(500).json({ message: "Server error" });
                        });
                }
            })
            .catch((error) => {
                console.log('UPDATE Comment error:', error);
                res.status(500).json({ message: "Server error" });
            });

    } catch (error) {
        console.error("UPDATE Comment error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteComment = async (req, res) => {
    const id = req.params.id;
    const getQuery = (`select * from comments where id = ${id}`);
    const deleteQuery = (`delete from comments where id = ${id}`);

    // Checks if id is a valid number
    if (isNaN(id)) {
        console.log("DELETE Comment error:", `Invalid id`);
        res.status(400).json({ message: "Invalid id" });
        return;
    }

    try {
        // Checks if comment with id exists
        db.oneOrNone(getQuery)
            .then((data) => {
                if (data == null) {
                    console.log("DELETE Comment error:", `Comment with id ${id} not found`);
                    res.status(404).json({ message: "Comment not found" });
                } else {
                    // Tries to comment the post with id (if comment exists)
                    db.query(deleteQuery)
                        .then((data) => {
                            console.log('DELETE Comment results:', data);
                            res.status(200).json(data);
                        })
                        .catch((error) => {
                            console.log('DELETE Comment error:', error);
                            res.status(500).json({ message: "Server error" });
                        });
                }
            })
            .catch((error) => {
                console.log('DELETE Comment error:', error);
                res.status(500).json({ message: "Server error" });
            });

    } catch (error) {
        console.error("DELETE Comment error:", error);
        res.status(500).json({ message: "Server error" });
    }
};