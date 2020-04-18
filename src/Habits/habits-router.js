const express = require('express');
const HabitsService = require('./habits-service');
const habitRouter = express.Router();
const jsonParser = express.json()

habitRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db');
        HabitsService.getAllHabits(knexInstance)
            .then(habits => {
                res.json(habits.map(habit => ({
                    id: habit.id,
                    habit: habit.habit
                })))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const knexInstance = req.app.get('db');
        const { habit } = req.body;
        const newHabit = { habit }
        if (habit === null) {
            res.status(400).json({
                error: { message: 'Missing habit name in request body' }
            });
        };

        HabitsService.insertHabit(
            knexInstance,
            newHabit
        )
            .then(postRes => {
                res
                    .status(201)
                    .location(`${req.originalUrl}/${habit.id}`)
                    .json(postRes)
            })
            .catch(next)
    });
habitRouter
    .route('/:habit_id')
    .all((req, res, next) => {
        HabitsService.getById(
            req.app.get('db'),
            req.params.habit_id
        )
            .then(habit => {
                if (!habit) {
                    return res.status(404).json({
                        error: { message: 'Habit does not exist' }
                    })
                }
                req.habit = habit
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        console.log(req.body)
        const { habit } = req;
        res.json({
            id: habit.id,
            habit: habit.habit
        });
    })
    .delete((req, res, next) => {
        HabitsService.deleteHabit(
            req.app.get('db'),
            req.params.habit_id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })


module.exports = habitRouter;