import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const mongoConnection = () => {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
    mongoose.connection.on('connected', ()=>console.log("MongoDB Connected"));
    mongoose.connection.on('disconnected', ()=>console.error("MongoDB Disconnected"));
    // mongoose.connection.on('disconnected', (error)=>console.error("MongoDB Disconnected: ", error.message));
    mongoose.connection.on('disconnected', (error) => {
        if (error) {
          console.error("MongoDB Disconnected: ", error.message);
        } else {
          console.error("MongoDB Disconnected");
        }
    });
}

export default mongoConnection;