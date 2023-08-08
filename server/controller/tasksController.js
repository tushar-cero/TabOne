import dotenv from 'dotenv';
dotenv.config();

import Task from '../model/tasks.js';

export const getTasks = async (request, response) => {
    try {
        const tasks = await Task.find({user: request.user});
        response.status(200).json({message: "Tasks Found", tasks})
    } catch (error) {
        console.error(error.message);
        response.status(500).json({errors: "Internal Server Error"});
    }
}
export const getTask = async (request, response) => {
    const {id} = request.params;
    try {
        const task = await Task.findById(id);
        if(!task) {
            response.status(404).json({message: "Task Not Found"})
        } else {
            if(task.user.toString() !== request.user) {
                response.status(401).json({message: "Not Authorised"})
            } else{
                response.setHeader("Content-Type", "application/json");
                response.json({message: "Task Found", task});
            }
        }
    } catch (error) {
        console.error(error.message);
        response.status(500).json({errors: "Internal Server Error"});
    }
}
export const createTask = async (request, response) => {
    const {task_description, completed, date, priority} = request.body;
    try {
        const task = await Task.create({
            task_description, 
            completed: false, 
            date,
            priority,
            user: request.user  
        });
        response.status(201).json({message: "Task Created Successfully", task});
    } catch (error) {
        console.error(error.message);
        response.status(500).json({errors: "Internal Server Error"});
    }
}
export const updateTask = async (request, response) => {
    const {id} = request.params;
    const {task_description, completed, date, priority} = request.body;
    try {
        const task = await Task.findById(id);
        if(!task) {
            response.status(404).json({message: "Task Not Found"})
        }
        if(task.user.toString() !== request.user) {
            response.status(401).json({message: "Not Authorised"})
        } else{
            task.task_description = task_description;
            task.completed = completed;
            task.date = date;
            task.priority = priority;
            await task.save();
            response.status(200).json({message: "Task Updated Successfully"})
        }
    } catch (error) {
        console.error(error.message);
        response.status(500).json({errors: "Internal Server Error"});
    }
}
export const deleteTask = async (request, response) => {
    const {id} = request.params;
    console.log("Function entered. ID Found: ", id)
    try {
        const task = await Task.findById(id);
        console.log("try Block entered. Value of task is : ", task);
        if(!task) {
            throw new Error("Task not found");
            // response.status(404).json({message: "Task Not Found"})
        } else {
            if(task.user.toString() !== request.user) {
                response.status(401).json({message: "Not Authorised"})
            } else{
                const task = await Task.find({user: request.user});
                if(task) {
                    await Task.deleteMany({user: request.user})
                }
                await task.remove();
                response.status(200).json({message: "Task Deleted Successfully"})
            }
        }
    } catch (error) {
        console.error(error.message);
        response.status(500).json({errors: "Internal Server Error"});
    }
}
export const deleteATask = async (request, response) => {
    try {
      const { id: taskId } = request.params;
      const task = await Task.findByIdAndDelete(taskId);
  
      if (!task) {
        return response.status(404).json({ msg: `No task with id: ${taskId}` });
      } else {
        response.status(200).json({
          message: `Todo with id: ${taskId} deleted successfully.`,
          task: task,
        });
      }
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
};