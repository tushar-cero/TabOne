import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

import User from '../model/user.js';
import Task from '../model/tasks.js';

export const register = async (request, response) => {
    const { name, email, password } = request.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return response.status(400).json({ message: "User already exists!!" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(password, salt);
        user = new User({ name, email, password: hashed_password });
        await user.save();
        const payload = {
            user: user._id
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 600000 });
        response.cookie('token', token, { httpOnly: true, expiresIn: 600000 });
        const { password: pass, ...rest } = user._doc;
        response.status(201).json({ message: "User created successfully", user: rest });
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ errors: "Internal Server Error" });
    }
}
export const login = async (request, response) => {
    const { email, password } = request.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return response.status(404).json({ message: "User Not Found" });
        }
        const is_match = await bcrypt.compare(password, user.password);
        if (!is_match) {
            return response.status(400).json({ message: "Invalid User Credentials" });
        }
        const payload = {
            user: user._id
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 600000 });
        response.cookie('token', token, { httpOnly: true, expiresIn: 600000 });
        const { password: pass, ...rest } = user._doc;
        response.status(200).json({ message: "User Logged in successfully", user: rest });
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ errors: "Internal Server Error" });
    }
}
export const logout = async (request, response) => {
    response.clearCookie("token");
    response.status(200).json({ message: "User Logged out successfully" });
}
export const getMe = async (request, response) => {
    try {
        const user = await User.findById(request.user);
        if (!user) {
            return response.status(404).json({ message: "User Not Found" });
        }
        const { password: pass, ...rest } = user._doc;
        response.status(200).json({ message: "User Found", user: rest });
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ errors: "Internal Server Error" });
    }
}
export const updateDetails = async (request, response) => {
    const { name, email } = request.body;
    try {
        const user = await User.findById(request.user);
        if (!user) {
            return response.status(404).json({ message: "User Not Found" });
        }
        let exists = await User.findOne({ email });
        if (exists && exists._id.toString() !== user._id.toString()) {
            return response.status(404).json({ message: "Email already exists" });
        } else {
            user.name = name;
            user.email = email;
            await user.save();
            const { password: pass, ...rest } = user._doc;
            response.status(200).json({ message: "User Updated Successfully", user: rest });
        }
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ errors: "Internal Server Error" });
    }
}
export const updatePassword = async (request, response) => {
    const { password, new_password } = request.body;
    try {
        const user = await User.findById(request.user);
        if (!user) {
            return response.status(404).json({ message: "User Not Found" });
        } else {
            const is_match = await bcrypt.compare(password, user.password);
            if (!is_match) {
                return response.status(400).json({ message: "Invalid User Credentials" });
            } else {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(new_password, salt);
                user.save();
            }
            const { password: pass, ...rest } = user._doc;
            response.status(200).json({ message: "Password Updated successfully", user: rest });
        }
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ errors: "Internal Server Error" });
    }
}
export const deleteUser = async (request, response) => {
    try {
        const user = await User.findById(request.user);
        if (!user) {
            return response.status(404).json({ message: "User Not Found" });
        } else {
            const task = await Task.find({ user: request.user });
            if (task) {
                await Task.deleteMany({ user: request.user });
            }
            await user.remove();
            response.status(200).json({ message: "User Deleted Successfully" });
        }
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ errors: "Internal Server Error" });
    }
}
export const deleteAUser = async (request, response) => {
    try {
        const user = await User.findByIdAndDelete(request.user);

        if (!user) {
            return response.status(404).json({ msg: `User Not Found`});
        } else {
            response.clearCookie("token");
            const task = await Task.find({ user: request.user });
            if (task) {
                await Task.deleteMany({ user: request.user });
            }
            response.status(200).json({ message: `User deleted successfully.`, user: user });
        }
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ errors: "Internal Server Error" });
    }
};