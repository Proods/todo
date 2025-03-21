import { describe, test, expect, vi, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../../index.mjs';
import routes from '../../utils/routes.util.mjs';
import * as services from '../../services/tasks.service.mjs';
import * as mocks from '../mocks/tasks.mock.mjs';

describe('CRUD tests', () => {

    const api = routes.api.tasks;
    const id = 1;

    afterAll(() => {
        vi.resetAllMocks();
    })

    test('Create task', async () => {

        const spy = vi.spyOn(services, 'insertTask').mockImplementation(mocks.insertTask);

        const newTask = { title: 'Dummy_1'};
        const response = await request(app).post(api).send(newTask);
        console.log(response.body.data);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('New task successfully created');
        expect(response.body.data.title).toEqual(newTask.title);      

    })

    test('Get task', async () => {

        const spy = vi.spyOn(services, 'selectTask').mockImplementation(mocks.selectTask);

        const response = await request(app).get(`${api}/${id}`);
        console.log(response.body.data);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe(`Task ${id} successfully fetched`);
        expect(response.body.data.id).toBe(id);        

    })

    test('Update task', async () => {

        const spy = vi.spyOn(services, 'updateTask').mockImplementation(mocks.updateTask);

        const data = { title: 'Update Dummy_1', note: 'This is a note' };
        const response = await request(app).put(`${api}/${id}`).send(data);
        console.log(response.body.data);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe(`Task ${id} successfully updated`);
        expect(response.body.data.id).toBe(id);
        expect(response.body.data.title).toBe(data.title);
        expect(response.body.data.note).toBe(data.note);        

    })

    test('Get all tasks', async () => {

        const spy = vi.spyOn(services, 'selectAllTasks').mockImplementation(mocks.selectAllTasks);

        const newTask = { title: 'Dummy_2'};
        let response = await request(app).post(api).send(newTask);
        console.log(response.body.data);
        
        response = await request(app).get(api);
        console.log(response.body.data);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Request successful');
        expect(response.body.data).toHaveLength(2);        

    })

    test('Delete task', async () => {

        const spy = vi.spyOn(services, 'deleteTask').mockImplementation(mocks.deleteTask);

        let response = await request(app).delete(`${api}/${id}`);
        console.log(response.body.data);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe(`Task ${id} successfully deleted`);        

        response = await request(app).get(api);
        console.log(response.body.data);

        expect(response.body.data).toHaveLength(1);
        expect(response.body.data[0].id).toBe(2);        
        
    })

    test('GET, UPDATE, DELETE with wrong id', async () => {

        const id_rand = 22;
        const data = { location: 'location' };
        const route = `${api}/${id_rand}`;

        // GET
        let response = await request(app).get(route);
        checkWrongId(response, id_rand);

        // DELETE
        response = await request(app).delete(route);
        checkWrongId(response, id_rand);

        // UPDATE
        response = await request(app).put(route).send(data);
        checkWrongId(response, id_rand);
        
    })

    const checkWrongId = (res, id_rand) => {
        expect(res.status).toBe(400);
        expect(res.body.message).toBe(`Task ${id_rand} does not exist`);
    }
    
})