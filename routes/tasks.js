const {Router} = require('express');
const Tasks = require('../models/tasks');
const router = Router();

const routerError = (e, res) => {
    console.log(e);
    res.status(500).json({
        message: 'Server error. Please try later'
    })
}

// get tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Tasks.findAll();
        res.status(200).json(tasks);
    } catch (e) {
        routerError(e, res);
    }
});

// add task
router.post('/', async (req, res) => {
    try {
        const task = await Tasks.create({
            name: req.body.name,
            completed: false
        });
        res.status(201).json({task});
    } catch (e) {
        routerError(e, res);
    }
});

// edit task
router.put('/:id', async (req, res) => {
    try {
        const task = await Tasks.findByPk(+req.params.id);
        if (task) {
            task.completed = true;
            await task.save();
            res.status(200).json({task});
        } else {
            res.status(404);
        }
    } catch (e) {
        routerError(e, res);
    }
});

// remove task
router.delete('/:id', async (req, res) => {
    try {
        // just for example use findAll for see how WHERE works
        const tasks = await Tasks.findAll({
            where: {
                id: +req.params.id
            }
        });
        await tasks[0].destroy();
        res.status(204).json(); // 204 status mean all OK but we not return data in response
    } catch (e) {
        routerError(e, res);
    }
});

module.exports = router;