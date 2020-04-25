const express = require('express');
const EntriesService = require('./entries-service');
const entriesRouter = express.Router();
const jsonParser = express.json();

entriesRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = (req.app.get('db'));
        EntriesService.getAllEntries(knexInstance)
            .then(entries => {
                res.json(entries.map(entry => ({
                    id: entry.id,
                    title: entry.title,
                    date: entry.date,
                    content: entry.content,
                    monthid: entry.monthid
                })));
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const {
            title,
            content,
            date,
            monthid
        } = req.body;
        const newEntry = {
            title,
            content,
            date,
            monthid
        }
        for (const [key, value] of Object.entries(newEntry))
            if (value == null)
                return res.status(400).json({
                    error: { message: `missing ${key} in request body` }
                })
        EntriesService.insertEntry(
            req.app.get('db'),
            newEntry
        ).then(entry => {
            res
                .status(201)
                .location(`${req.originalUrl}/${entry.id}`)
                .json(entry)
        });
    })
entriesRouter
    .route('/:entry_id')
    .all((req, res, next) => {
        EntriesService.getById(
            req.app.get('db'),
            req.params.entry_id
        ).then(entry => {
            if (!entry) {
                return res.status(404).json({
                    error: { message: 'Entry does not exist' }
                })
            }
            req.entry = entry;
            next()
        })
            .catch(next)
    })
    .get((req, res, next) => {
        const { entry } = req;
        res.json({
            id: entry.id,
            title: entry.title,
            date: entry.date,
            content: entry.content,
            monthid: entry.monthid
        })
    })
    .delete((req, res, next) => {
        EntriesService.deleteEntry(
            req.app.get('db'),
            req.params.entry_id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })


module.exports = entriesRouter;