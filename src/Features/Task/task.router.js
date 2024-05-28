// 1. Import express.
import express from 'express';
import TaskController from './task.controller.js';

// 2. Initialize Express router.
const taskRouter = express.Router();
const taskController = new TaskController();

taskRouter.post('/', (req, res)=>{
    taskController.createTask(req, res);
});
taskRouter.get('/user/:userId', (req, res)=>{
    taskController.getUserTasks(req, res);
});

export default taskRouter;
