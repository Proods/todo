import { expect } from 'vitest';
import request from 'supertest';
import { app } from '../../../index.mjs';
import routes from '../../../utils/routes.util.mjs';

const flag = true;
const api = routes.api.tasks;
const id = 3;

export const get_http = 'GET';
export const create_http = 'CREATE';
export const update_http = 'UPDATE';
export const delete_http = 'DELETE';

export const checkError = async (method, field, data, msg) => {
    let response;
    if (method === create_http) {
        response = await request(app).post(api).send(data);
    } else {
        response = await request(app).put(`${api}/${id}`).send(data);
    }
    print(method, response.body[0]);
    check(response, field, msg);
}

export const checkPass = async (method, data) => {
    let response;
    if (method === create_http){
        response = await request(app).post(api).send(data); 
    } else {
        response = await request(app).put(`${api}/${id}`).send(data);
    }
    print(method, response.body);
    expect(response.body).toBe(flag);
}

export const checkIdParam = async (method) => {
    let response;
    const route = `${api}/example`;
    if (method === get_http) {
        response = await request(app).get(route);
    } else if (method === update_http) {
        response = await request(app).put(route).send({ title: "TITLE"});
    } else if (method === delete_http) {
        response = await request(app).delete(route);
    }
    print(method, response.body[0]);
    check(response, 'id', 'id parameter must be digit(s)', 'params');
} 

const check = (res, field, msg, loc = 'body') => {    
    const body = res.body[0];
    expect(body.msg).toBe(msg);
    expect(body.path).toBe(field);
    expect(body.location).toBe(loc);
    expect(res.status).toBe(400);
}

const print = (method, log) => {
    console.log(method);
    console.log(log);
}