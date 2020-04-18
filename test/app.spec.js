const app = require('../src/app');
const knex = require('knex');
require('dotenv').config();
const { TEST_DB_URL } = require('../src/config');
const { makeHabitsArray, makeEntriesArray } = require('./reflect.fixtures')
describe('App', () => {
    it('GET / responds with 200 containing "Hello, world!"', () => {
        return supertest(app)
            .get('/')
            .expect(200, 'Hello, world!')
    });
});

describe('Habits endpoints', function () {
    console.log(TEST_DB_URL)
    let db
    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        });
        app.set('db', db);
    })

    after('disconnect from db', () => db.destroy())
    beforeEach('clean the table', () => db.raw('TRUNCATE  habits RESTART IDENTITY CASCADE;'))
    afterEach('cleanup', () => db.raw('TRUNCATE  habits RESTART IDENTITY CASCADE;'))

    describe('GET /habits', () => {
        context('Given no habits', () => {
            it('responds with 200 and an empty list', () => {
                return supertest(app)
                    .get('/habits')
                    .expect(200, [])
            });
        })

        context('Given there are habits in the db', () => {
            const testHabits = makeHabitsArray()
            beforeEach('insert habits', () => {
                return db
                    .into('habits')
                    .insert(testHabits)
            })

            it('responds with 200 and all habits', () => {
                return supertest(app)
                    .get('/habits')
                    .expect(200, testHabits)
            });
        })
    });

    describe('POST /habits', () => {
        it('creates a habit responds with 201 and new habit', () => {
            const newHabit = { habit: 'this new habit' };

            return supertest(app)
                .post('/habits')
                .send(newHabit)
                .expect(201)
                .expect(res => {
                    expect(res.body.habit).to.eql(newHabit.habit)
                })
                .then(res => {
                    supertest(app)
                        .get(`/habits/${res.body.id}`)
                        .expect(res.body)
                });
        });
    });

    describe('DELETE /habits/:id', () => {
        context('Given no habits', () => {
            it('repsonds with 404', () => {
                const habitId = 1234
                return supertest(app)
                    .delete(`/habits/${habitId}`)
                    .expect(404, {
                        error: { message: 'Habit does not exist' }
                    })
            })
        })
    })
})

describe('Entry endpoints', function () {
    console.log(TEST_DB_URL)
    let db
    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        });
        app.set('db', db);
    })

    after('disconnect from db', () => db.destroy())
    beforeEach('clean the table', () => db.raw('TRUNCATE  entry RESTART IDENTITY CASCADE;'))
    afterEach('cleanup', () => db.raw('TRUNCATE entry RESTART IDENTITY CASCADE;'))

    describe('GET /entry', () => {
        context('Given no entries', () => {
            it('responds with 200 and empty list', () => {
                return supertest(app)
                    .get('/entry')
                    .expect(200, [])
            })
        })

        // context('Given there are entries', () => {
        // const testEntry = makeEntriesArray()
        // beforeEach('insert entries', () => {
        // return db
        // .into('entry')
        // .insert(testEntry)
        // })
        // 
        // it('responds with 200 and all entries', () => {
        // return supertest(app)
        // .get('/entry')
        // .expect(200, testEntry)
        // })
        // });
    });

    describe('GET /entry/:entry_id', () => {
        context('Given no entries', () => {
            it('responds with 404', () => {
                const entryId = 1234;
                return supertest(app)
                    .get(`/entry/${entryId}`)
                    .expect(404, { error: { message: 'Entry does not exist' } })
            })
        });

        context('Given there are entries', () => {
            const testEntry = makeEntriesArray()
            beforeEach('insert entries', () => {
                return db
                    .into('entry')
                    .insert(testEntry)
            })

            it('responds with 200 and the entry', () => {
                const entryId = 1
                const expectedEntry = testEntry[entryId - 1]
                return supertest(app)
                    .get(`/entry/${entryId}`)
                    .expect(200, expectedEntry)
            })
        })
    })

    describe('POST /entry/:entry_id', () => {
        it('creates a entry responds with 201 and new entry', () => {
            const newEntry = {
                title: "new entry",
                content: "this new entry",
                monthid: 2
            };

            return supertest(app)
                .post('/entry')
                .send(newEntry)
                .expect(201)
                .expect(res => {
                    expect(res.body.title).to.eql(newEntry.title)
                    expect(res.body.content).to.eql(newEntry.content)
                    expect(res.body.monthid).to.eql(newEntry.monthid)
                })
                .then(res => {
                    supertest(app)
                        .get(`/entry/${res.body.id}`)
                        .expect(res.body)
                });
        });
    });

    describe('DELETE /entry/:entry_id', () => {
        describe('DELETE /entry/:entry_id', () => {
            context('Given no entries', () => {
                it('repsonds with 404', () => {
                    const entryId = 1234
                    return supertest(app)
                        .delete(`/entry/${entryId}`)
                        .expect(404, {
                            error: { message: 'Entry does not exist' }
                        })
                })
            })
        })
    })
})
