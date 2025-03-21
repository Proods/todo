import express from 'express';
import * as valid from '../validations/tasks.validation.mjs';
import * as controllers from '../controllers/tasks.controller.mjs';

const router = express.Router();

router.route('/')
    .get(controllers.getAllTasks)
    .post(
        valid.id_non(),
        valid.dateCreated_non(),        
        valid.completion_non(),
        valid.title(),
        valid.targetDate(),
        valid.targetTime(),
        valid.location(),
        valid.note(),
        valid.validationError,
        controllers.createTask)

router.route('/:id')
    .get(
        valid.param_id(),
        valid.validationError,
        controllers.getTask)
    .put(
        valid.param_id(),
        valid.id_non(),
        valid.dateCreated_non(),        
        valid.title_opt(),
        valid.targetDate(),
        valid.targetTime(),
        valid.location(),
        valid.note(),
        valid.completion(),
        valid.validationError,
        controllers.updateTask)
    .delete(
        valid.param_id(),
        valid.validationError,
        controllers.deleteTask)

export default router;