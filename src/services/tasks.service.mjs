import db from '../configs/db.config.mjs';
import { eq } from 'drizzle-orm';
import { tasks } from '../models/task.mjs';

export const selectAllTasks = () => {
    return db.select().from(tasks);
}

export const selectTask = (id) => {
    return db.select().from(tasks).where(eq(tasks.id, id));
}

export const insertTask = (newtask) => {
    return db.insert(tasks).values(newtask).returning();
}

export const updateTask = (id, task) => {
    return db.update(tasks).set(task).where(eq(tasks.id, id)).returning();
}

export const deleteTask = (id) => {
    return db.delete(tasks).where(eq(tasks.id, id)).returning();
}

