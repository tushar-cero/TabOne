import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    task_description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        required: false
    },
    priority: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

const tasks = mongoose.model("Tasks", taskSchema);
export default tasks;