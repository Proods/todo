import { describe, test } from 'vitest';
import { get_http, create_http, update_http, delete_http, checkIdParam, checkError } from './tasks.utils.validation.mjs';

describe('Input tests', () => {

    const num_rand = 5;
    const str_rand = 'random';
    const str_rand_long= '8t0vLOyIILp934LLesTdJCqY3hfUIRZMjYee1tfcOnF33JCCaP7omSxPAggZN';    

    test('id parameter must be digit(s)', async () => {

        // GET
        await checkIdParam(get_http);
        // UPDATE
        await checkIdParam(update_http);
        // DELETE
        await checkIdParam(delete_http);

    })

    test('title must be a string', async () => {

        const field = 'title';
        const data = { title: num_rand };
        const msg = 'input must be a string';
        // CREATE
        await checkError(create_http, field, data, msg);
        // UPDATE
        await checkError(update_http, field, data, msg);

    })

    test('title must not exceed character limit', async () => {

        const field = 'title';
        const data = { title: str_rand_long };
        const msg = 'input must not exceed 60 characters';
        // CREATE
        await checkError(create_http, field, data, msg);
        // UPDATE
        await checkError(update_http, field, data, msg);

    })

    test('location must be a string', async () => {

        const field = 'location';
        const data = { title: "TITLE", location: num_rand };
        const msg = 'input must be a string';
        // CREATE
        await checkError(create_http, field, data, msg);
        // UPDATE
        await checkError(update_http, field, data, msg);

    })

    test('location must not exceed character limit', async () => {

        const field = 'location';
        const str_extend = str_rand_long + str_rand_long;
        const data = { title: "TITLE", location: str_extend };
        const msg = 'input must not exceed 90 characters';
        // CREATE
        await checkError(create_http, field, data, msg);
        // UPDATE
        await checkError(update_http, field, data, msg);

    })

    test('note must be a string', async () => {

        const field = 'note';
        const data = { title: "TITLE", note: num_rand };
        const msg = 'input must be a string';
        // CREATE
        await checkError(create_http, field, data, msg);
        // UPDATE
        await checkError(update_http, field, data, msg);

    })

    test('targetDate must be a string', async () => {

        const field = 'targetDate';
        const data = { title: "TITLE", targetDate: num_rand };
        const msg = 'input must be a string';
        // CREATE
        await checkError(create_http, field, data, msg);
        // UPDATE
        await checkError(update_http, field, data, msg);

    })

    test('targetDate must be in the right format', async () => {

        const field = 'targetDate';
        const data = { title: "TITLE", targetDate: str_rand };
        const msg = 'input must be a valid date in the format YYYY-MM-DD';
        // CREATE
        await checkError(create_http, field, data, msg);
        // UPDATE
        await checkError(update_http, field, data, msg);

    })

    test('targetTime must be a string', async () => {

        const field = 'targetTime';
        const data = { title: "TITLE", targetTime: num_rand };
        const msg = 'input must be a string';
        // CREATE
        await checkError(create_http, field, data, msg);
        // UPDATE
        await checkError(update_http, field, data, msg);

    })

    test('targetTime must be in the right format', async () => {

        const field = 'targetTime';
        const data = { title: "TITLE", targetTime: str_rand };
        const msg = 'input must be a valid date in the format HH:MM:SS';
        // CREATE
        await checkError(create_http, field, data, msg);
        // UPDATE
        await checkError(update_http, field, data, msg);

    })

    test('completion must be a string', async () => {

        const field = 'completion';
        const data = { title: "TITLE", completion: num_rand };
        const msg = 'input must be a string';
        await checkError(update_http, field, data, msg);

    })

    test('completion must be in the right format', async () => {

        const field = 'completion';
        const data = { title: "TITLE", completion: str_rand };
        const msg = 'input must be a valid date in the format YYYY-MM-DD';
        await checkError(update_http, field, data, msg);
        
    })

})