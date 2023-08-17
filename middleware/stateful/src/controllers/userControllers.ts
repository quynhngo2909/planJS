import * as userServices from "../services/userServices";
import * as jwt from "jsonwebtoken";

const getUserByEmail = async (req, res) => {
    try {
        const userEMail = req.params.useremail;
        const user = await userServices.getUserByEmail(userEMail);
        res.status(200).send(user);
    }
    catch (err) {
        console.log(err + "");
        res.status(400).send();
    }
};

const getUserById = async (req, res) => {
    try {
        const userId = req.body.id;
        const user = await userServices.getUserByEmail(userId);
        res.status(200).send(user);
    }
    catch (err) {
        console.log(err + "");
        res.status(400).send();
    }
};

const login = (req, res) => {
    const user = req.user;
    // const token = jwt.sign({ username: user.email }, process.env.JWT_SECRET_KEY, {
    //   expiresIn: process.env.JWT_EXPIRED_IN,
    // });
    if (req.isAuthenticated())
        return res.status(200).json({ mes: "Login successful" });
    return res.status(401).json({ mes: "Login failed" });
};


export {
    getUserByEmail,
    getUserById,
    login,
}