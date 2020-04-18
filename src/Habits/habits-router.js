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
    });



module.exports = habitRouter;