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
    try {
        db.oneOrNone(query)
            .then((data) => {
                if (data == null){
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

export const deleteUser = async (req, res) => {
    const id = req.params.id;
    const query = (`delete from users where id = ${id}`);
    try {
        db.query(query)
            .then((data) => {
                if (data == false){
                    console.log("DELETE User error:", `User with id ${id} not found`);
                    res.status(404).json({ message: "User not found" });
                } else {
                    console.log('DELETE User results:', data);
                    res.status(200).json(data);
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