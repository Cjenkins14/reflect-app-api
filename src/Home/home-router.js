const express = require('express');
const HomeService = require('./home-service');
const homeRouter = express.Router();


homeRouter
    .route('/')
    .get((req, res, next) => {
        HomeService.getMonths(
            req.app.get('db'),
        )
            .then(months => {
                res.json(months.map(month => ({
                    id: month.id,
                    name: month.name
                })))
            })
    })
homeRouter
    .route('/:month_id')
    .all((req, res, next) => {
        const knexInstance = req.app.get('db')
        HomeService.getEntriesByMonth(
            knexInstance, req.params.month_id
        )
            .then(entries => {
                if (!entries) {
                    return res.status(404).json({
                        error: { message: 'Entries not found' }
                    })
                }
                req.entries = entries;
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        const { entries } = req;
        console.log(entries)
        res.json(entries.map(entry => ({
            id: entry.id,
            title: entry.title,
            date: entry.date,
            content: entry.content,
            monthid: entry.monthid
        })))
    })

module.exports = homeRouter;