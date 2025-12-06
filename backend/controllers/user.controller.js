import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import generateTokenAndSetCokkie from "../utils/generateToken.js";

export const signUp = async (req, res) => {
    try {
        const { name, username, password } = req.body;
        const exist = await User.findOne({ username });

        if (exist) {
            return res.status(400).json({ error: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const user = new User({ name, username, password: hashedPass });

        if (user) {
            generateTokenAndSetCokkie(user._id, res);
            await user.save();

            return res.status(201).json({
                _id: user._id,
                name: user.name,
                username: user.username
            });
        } else {
            res.status(400).json({ error: 'Invalid User Data' });
        }
    } catch (error) {
        console.log("Error in Signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const correctPass = await bcrypt.compare(password, user?.password || "");

        if (!user || !correctPass) {
            return res.status(401).json({ error: 'Invalid Username or Password' });
        }

        generateTokenAndSetCokkie(user._id, res);

        return res.status(201).json({
            _id: user._id,
            username: user.username,
            name: user.name
        });
    } catch (error) {
        console.log("Error in Login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged Out Successfully" });
    } catch (error) {
        console.log("Error in Logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}