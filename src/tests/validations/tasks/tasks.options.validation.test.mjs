import { describe, test, vi, afterAll } from 'vitest';
import { create_http, update_http, checkError, checkPass } from './tasks.utils.validation.mjs';


vi.mock('../../../controllers/tasks.controller.mjs', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        createTask: (req, res) => { res.send(true); },
        updateTask: (req, res) => { res.send(true); }
    };
})

describe('Option tests', () => {
    
    const msg = 'field is irrelevant';

    afterAll(() => {
        vi.resetAllMocks();
    })
        
    test('id field should not be present', async () => {
        
        const field = 'id';
        const data = { title: 'TITLE', id: 3 };
        // CREATE method
        await checkError(create_http, field, data, msg);
        // UPDATE method
        await checkError(update_http, field, data, msg);

    })

    test('dateCreated field should not be present', async () => {
        
        const field = 'dateCreated';
        const data = { title: 'TITLE', dateCreated: '2025-03-16' };
        // CREATE method
        await checkError(create_http, field, data, msg);        
        // UPDATE method
        await checkError(update_http, field, data, msg);

    })

    test('title is mandatory only in CREATE', async () => {       
     
        const data = { note: 'NOTE' };
        // CREATE method
        await checkError(create_http, 'title', data, 'input is required');        
        // UPDATE method
        await checkPass(update_http, data);

    })

    test('completion field should not be present in CREATE', async () => {       
     
        const data = { title: 'TITLE', completion: '2025-03-16' };
        // CREATE method
        await checkError(create_http, 'completion', data, msg);        
        // UPDATE method
        await checkPass(update_http, data);

    })

    test('other fields are optional', async () => {

        const data = { title: 'TITLE' }
        // CREATE method
        await checkPass(create_http, data);        
        // UPDATE method
        await checkPass(update_http, data);

    })
        
})