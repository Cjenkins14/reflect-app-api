const app = require('../src/app');
const knex = require('knex');
require('dotenv').config();
const { TEST_DB_URL } = require('../src/config');

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
            connection: 'postgresql://dunder_mifflin@localhost/reflect_test'
        });
        app.set('db', db);
    })

    after('disconnect from db', () => db.destroy())
    // beforeEach('clean the table', () => db.raw('TRUNCATE habits RESTART IDENTITY CASCADE;'))
    // afterEach('cleanup', () => db.raw('TRUNCATE habits RESTART IDENTITY CASCADE;'))

    describe('GET /habits', () => {
        context('Given no habits', () => {
            it('responds with 200 and an empty list', () => {
                return supertest(app)
                    .get('/habits')
                    .expect(200, [])
            });
        });
    });
})

