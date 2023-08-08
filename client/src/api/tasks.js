import axios from 'axios';
const instance = axios.create(
    {
        baseURL: 'http://localhost:5000'
    }
)

export const getTasks = async () => {
    try {
        const response = await instance.get("/api/tasks");
        return response;
    } catch (error) {
        return error;
    }
};

export const getTask = async (id) => {
    try {
        const response = await instance.get(`/api/tasks/${id}`);
        return response;
    } catch (error) {
        return error;
    }
};

export const createTask = async (task) => {
    try {
        const response = await instance.post("/api/tasks/create", task);
        return response;
    } catch (error) {
        return error;
    }
};

export const updateTasks = async (task, id) => {
    try {
        const response = await instance.put(`/api/tasks/update/${id}`, task);
        return response;
    } catch (error) {
        return error;
    }
};

export const deleteTask = async (id) => {
    try {
        const response = await instance.delete(`/api/tasks/delete/${id}`);
        return response;
    } catch (error) {
        return error;
    }
};

