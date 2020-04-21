const HomeService = {
    getEntriesByMonth(knex, id) {
        return knex.select('*').from('entry').where('monthid', id)
    },
    getMonths(knex) {
        return knex.select('*').from('months')
    }
}

module.exports = HomeService;