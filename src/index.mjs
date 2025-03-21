import { PORT } from '../config.mjs';
import express from 'express';
import routes from './utils/routes.util.mjs';
import taskRouter from './routes/tasks.route.mjs';
import { errorHandler } from './configs/handlers.confg.mjs';

export const app = express();

app.use(express.json());

// Routes
app.use(routes.api.tasks, taskRouter);

// Eror handling
app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));