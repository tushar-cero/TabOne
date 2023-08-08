import axios from 'axios';
const instance = axios.create(
    {
        baseURL: 'http://localhost:5000'
    }
);

export const register = async (user) => {
    try {
        const res = await instance.post("/api/users/register", user);
        return res;
    } catch (error) {
        return error
    }
}
export const login = async (user) => {
    try {
        const res = await instance.post("/api/users/login", user);
        return res;
    } catch (error) {
        return error
    }
}
export const logout = async () => {
    try {
        const res = await instance.get("/api/users/logout");
        return res;
    } catch (error) {
        return error
    }
}
export const getUser = async () => {
    try {
        const res = await instance.get("/api/users/me");
        return res;
    } catch (error) {
        return error
    }
}
export const updateDetails = async (user) => {
    try {
        const res = await instance.put("/api/users/updatedetails", user);
        return res;
    } catch (error) {
        return error
    }
}
export const updatePassword = async (user) => {
    try {
        const res = await instance.put("/api/users/updatepassword", user);
        return res;
    } catch (error) {
        return error
    }
}
export const deleteUser = async () => {
    try {
        const res = await instance.delete("/api/users/delete");
        return res;
    } catch (error) {
        return error
    }
}