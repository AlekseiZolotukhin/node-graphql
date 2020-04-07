const Tasks = require('../models/tasks');

const pupils = [
    {
        name: 'Jane',
        campus: 'A',
        age: 18
    },
    {
        name: 'Mike',
        campus: 'B',
        age: 19
    }
];

module.exports = {
    // just our test resolver function
    testRequest() {
        return 'This your first GraphQL response.'
    },
    // return our pupils
    pupils() {
        return {
            count: Math.ceil(Math.random() * 10),
            pupils: pupils
        }
    },
    // resolver for get random numbers
    random({min, max, count}) {
        const arr = [];
        for (let i = 0; i < count; i++) {
            const rand = Math.random() * (max - min) + min;
            arr.push(rand);
        }
        return arr;
    },
    // add new pupil
    addPupil({pupil: {name, age}}) {
        const newPupil = {
            name,
            age,
            campus: 'A'
        };
        pupils.push(newPupil);
        return newPupil;
    },
    // return tasks from our db
    async getTasks() {
        try {
            return await Tasks.findAll()
        } catch (e) {
            throw new Error('Get tasks failed')
        }
    },
    // add a new task
    async addTask({task}) {
        try {
            return await Tasks.create({
                name: task.name,
                completed: false
            });
        } catch (e) {
            throw new Error('Add tasks failed')
        }
    },
    // mark task as completed
    async completeTask({id}) {
        try {
            const task = await Tasks.findByPk(id);
            task.completed = true;
            await task.save();
            return task;
        } catch (e) {
            throw new Error('Required parameter ID is absent')
        }
    },
    // remove task
    async removeTask({id}) {
        try {
            const tasks = await Tasks.findAll({
                where: {id}
            });
            await tasks[0].destroy();
            return true;
        } catch (e) {
            throw new Error('Required parameter ID is absent')
        }
    }
}