import express from 'express';
const app = express();
import cors from 'cors';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
dotenv.config();

import tasksRoutes from './routes/tasks.js';
import usersRoutes from './routes/users.js';

// ---------- CONNECTING DB ----------
import mongoConnection from './database/db.js';
mongoConnection();

// ---------- MIDDLEWEAR ----------
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

// ---------- ROUTES ----------
app.use('/api/tasks', tasksRoutes)
app.use('/api/users', usersRoutes)

// ---------- STARTING SERVER ----------
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});