import pgp from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();

// Creates connection to the database
const connection = {
    host: 'localhost',
    port: 5432,
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
};
export const db = pgp()(connection);


// Lists all row of the given table
export const listAll = async (req, res, table) => {
    const query = `select * from ${table}`
    try {
        db.manyOrNone(query)
            .then((data) => {
                console.log(`GET ${table} results:`, data);
                res.status(200).json(data);
            })
            .catch((error) => {
                console.log(`GET ${table} error:`, error);
                res.status(500).json({ message: "Server error" });
            });

    } catch (error) {
        console.error(`GET ${table} error:`, error);
        res.status(500).json({ message: "Server error" });
    }
};


// Gets specific row of given table
export const getOne = async (req, res, table, element) => {
    const id = req.params.id;
    const query = (`select * from ${table} where id = ${id}`);

    // Checks if id is a valid number
    if (isNaN(id)) {
        console.log(`GET ${element} error:`, `Invalid id`);
        res.status(400).json({ message: "Invalid id" });
        return;
    }

    try {
        db.oneOrNone(query)
            .then((data) => {
                 // Checks if element with id exists
                if (data == null) {
                    console.log(`GET ${element} error:`, `${element} with id ${id} not found`);
                    res.status(404).json({ message: `${element} not found` });
                } else {
                     // Gets element (if it exists)
                    console.log(`GET ${element} results:`, data);
                    res.status(200).json(data);
                }
            })
            .catch((error) => {
                console.log(`GET ${element} error:`, error);
                res.status(500).json({ message: "Server error" });
            });

    } catch (error) {
        console.error(`GET ${element} error:`, error);
        res.status(500).json({ message: "Server error" });
    }
};


// Deletes specific row of given table
export const deleteOne = async (req, res, table, element) => {
    const id = req.params.id;
    const getQuery = (`select * from ${table} where id = ${id}`);
    const deleteQuery = (`delete from ${table} where id = ${id}`);

    // Checks if id is a valid number
    if (isNaN(id)) {
        console.log(`DELETE ${element} error:`, `Invalid id`);
        res.status(400).json({ message: "Invalid id" });
        return;
    }

    try {
        // Checks if element with id exists
        db.oneOrNone(getQuery)
            .then((data) => {
                if (data == null) {
                    console.log(`DELETE ${element} error:`, `${element} with id ${id} not found`);
                    res.status(404).json({ message: `${element} not found` });
                } else {
                    // Tries to delete the element with id (if it exists)
                    db.query(deleteQuery)
                        .then((data) => {
                            console.log(`DELETE ${element} results:`, data);
                            res.status(200).json(data);
                        })
                        .catch((error) => {
                            console.log(`${element} User error:`, error);
                            res.status(500).json({ message: "Server error" });
                        });
                }
            })
            .catch((error) => {
                console.log(`${element} User error:`, error);
                res.status(500).json({ message: "Server error" });
            });

    } catch (error) {
        console.error(`${element} User error:`, error);
        res.status(500).json({ message: "Server error" });
    }
};