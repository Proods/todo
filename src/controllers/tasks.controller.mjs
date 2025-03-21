import { matchedData } from 'express-validator';
import * as services from '../services/tasks.service.mjs';
import { responseHandler } from '../configs/handlers.confg.mjs';

export const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await services.selectAllTasks();
        responseHandler(res, 200, 'Request successful', tasks);
    } catch (error) {
        next(error);
    }
}

export const getTask = async (req, res, next) => {
    const params = matchedData(req, { locations: ['params'] });
    const id = Number(params.id);
    try {
        let status = 200;
        let message = `Task ${id} successfully fetched`;
        const task = await services.selectTask(id);        
        if (!task.length) {
            status = 400;
            message = `Task ${id} does not exist`;
        }
        responseHandler(res, status, message, task[0]);
    } catch (error) {
        next(error);
    }
}

export const createTask = async (req, res, next) => {
    const data = matchedData(req, { locations: ['body'] });
    try {
        const task = await services.insertTask(data);
        responseHandler(res, 201, 'New task successfully created', task[0]);
    } catch (error) {
        next(error);
    }
}

export const updateTask = async (req, res, next) => {
    const params = matchedData(req, { locations: ['params'] });
    const id = Number(params.id);
    const data = matchedData(req, { locations: ['body'] });
    try {
        let status = 200;
        let message = `Task ${id} successfully updated`;
        const task = await services.updateTask(id, data);        
        if (!task.length) {
            status = 400;
            message = `Task ${id} does not exist`;
        }
        responseHandler(res, status, message, task[0]);
    } catch (error) {
        next(error);
    }
}

export const deleteTask = async (req, res, next) => {
    const params = matchedData(req, { locations: ['params'] });
    const id = Number(params.id);
    try {
        let status = 200;
        let message = `Task ${id} successfully deleted`;
        const task = await services.deleteTask(id);
        if (!task.length) {
            status = 400;
            message = `Task ${id} does not exist`;
        }
        responseHandler(res, status, message, task[0]);
    } catch (error) {
        next(error);
    }
}