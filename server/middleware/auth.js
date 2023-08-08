import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const auth = async (request, response, next) => {
    const token  = request.cookies.token;
    if(!token) {
        response.status(401).json({message: "Not authorised"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        request.user = decoded.user;
        next();
    } catch (error) {
        console.error(error.message);
        response.status(500).json({errors: "Internal Server Error"});
    }
}

export default auth;