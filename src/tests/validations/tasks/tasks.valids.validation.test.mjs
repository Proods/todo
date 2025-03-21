import { describe, test, vi, afterAll } from 'vitest';
import { create_http, checkPass, update_http } from './tasks.utils.validation.mjs';

vi.mock('../../../controllers/tasks.controller.mjs', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        createTask: (req, res) => { res.send(true); },
        updateTask: (req, res) => { res.send(true); }
    };
})

describe('Sample tests', () => {
    
    const data = {
        title: 'TITLE',
        location: 'LOCATION',
        note: 'NOTE',
        targetDate: '2025-03-16',
        targetTime: '23:57:03'
    }
    
    afterAll(() => {
        vi.resetAllMocks();
    })

    test('Valid data should pass ', async () => {

        // CREATE
        console.log('Data:');
        console.log(data);
        await checkPass(create_http, data);

        //UPDATE
        data.completion = '2025-03-17',
        console.log('Data with completion field added for UPDATE:');
        console.log(data);
        await checkPass(update_http, data);

    })

})