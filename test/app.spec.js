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
            connection: TEST_DB_URL
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

