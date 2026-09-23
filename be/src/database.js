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


// Lists all rows of the given table (using pagination)
export const listAll = async (req, res, table, limit = 5, filterableValues) => {
    let page = req.query.page || 1;
    let filters = "";

    // Constructs filter query (also removes values that table cannot be filtered by)
    let params = req.query;
    for (var key in params) {
        if (filterableValues.includes(key)) {
            if (filters == "") filters = filters + "WHERE ";
            else filters = filters + " and "

            if (key == "title") filters = filters + `${key} LIKE '%${params[key]}%'`;
            else if (key == "created_at") filters = filters + `${key} >= '${params[key]}'`;
        }
    }

    // Checks if page is a valid number
    if (isNaN(page)) {
        console.log(`GET ${table} error:`, `Invalid page number`);
        res.status(400).json({ message: "Invalid page number" });
        return;
    }

    // Constructs query
    const query =
        `select * from ${table} ${filters}
        OFFSET ${(page - 1) * limit} ROWS FETCH NEXT ${limit} ROWS ONLY`

    try {
        // Makes the request to get the elements
        db.manyOrNone(query)
            .then((data) => {
                console.log(`GET ${table} results:`, data);
                res.status(200).json(data);
            })
            .catch((error) => {
                console.log(`GET ${table} error:`, error);
                res.status(400).json({ message: "Bad request" });
            });

    } catch (error) {
        console.error(`GET ${table} error:`, error);
        res.status(400).json({ message: "Bad request" });
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
                res.status(400).json({ message: "Bad request" });
            });

    } catch (error) {
        console.error(`GET ${element} error:`, error);
        res.status(400).json({ message: "Bad request" });
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
                            res.status(400).json({ message: "Bad request" });
                        });
                }
            })
            .catch((error) => {
                console.log(`${element} User error:`, error);
                res.status(400).json({ message: "Bad request" });
            });

    } catch (error) {
        console.error(`${element} User error:`, error);
        res.status(400).json({ message: "Bad request" });
    }
};