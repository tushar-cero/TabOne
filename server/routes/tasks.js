import express from 'express';
const router = express.Router();

import {getTasks, getTask, createTask, updateTask, deleteATask} from '../controller/tasksController.js';

// import auth from '../middleware/auth.js';
// import {createTaskRules, updateTaskRules} from '../middleware/validationRules.js';
// import { validateResult } from '../middleware/validationResults.js'; 

router.get('/:id', getTask); // works
router.get('/', getTasks); // works
router.post('/create', createTask); // works
router.put('/update/:id', updateTask); // works
router.delete('/delete/:id', deleteATask); // works

export default router;

// router.get('/:id', auth, getTask); // works
// router.get('/', auth, getTasks); // works
// router.post('/create', auth, createTask); // works
// router.put('/update/:id', auth, updateTask); // works
// router.delete('/delete/:id', auth, deleteATask); // works
// router.post('/create', auth, createTaskRules, validateResult, createTask); // works
// router.put('/update/:id', auth, updateTaskRules, validateResult, updateTask); // works