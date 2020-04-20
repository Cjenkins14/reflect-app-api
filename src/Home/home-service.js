const HomeService = {
    getEntriesByMonth(knex, id) {
        return knex.select('*').from('entry').where('monthid', id)
    }
}

module.exports = HomeService;