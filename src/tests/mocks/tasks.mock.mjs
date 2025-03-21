let db = [];
let id_counter = 1;

const serialize = (data) => {
    for (let key in data) {
        if (data[key] === undefined) {
            delete data[key];
        }
    }
    return data;
}

const updateDB = (id, data) => {
    let updated = {};
    db = db.map(task => {
        if (task.id === id) {
            updated = { ...task, ...data };
            return updated;
        } else {
            return task;
        }
    });
    return updated;
}

export const selectAllTasks = () => db;

export const selectTask = (id) => {
    const task = db.find((task) => task.id === id);
    return task ? [task] : [];
}

export const insertTask = (data) => {
    const clean_data = serialize(data);
    const task = { id: id_counter, ...clean_data };
    if (db.push(task)) {
        id_counter++;
    }
    return [task];
}

export const updateTask = (id, data) => {
    const task = db.find((task) => task.id === id);
    if (!task) {
        return [];
    }
    const clean_data = serialize(data);
    const updated = updateDB(id, clean_data);
    return [updated];
}

export const deleteTask = (id) => {
    const task = db.find((task) => task.id === id);
    return task ? db.splice(db.indexOf(task), 1) : [];
}