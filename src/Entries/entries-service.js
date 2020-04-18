const EntriesService = {
    getAllEntries(knex) {
        return knex.select('*').from('entry')
    },
    getById(knex, id) {
        return knex.select('*').from('entry').where('id', id).first()
    },
    insertEntry(knex, newEntry) {
        return knex
            .insert(newEntry)
            .into('entry')
            .returning('*')
            .then(rows => rows[0])
    },
    deleteEntry(knex, id) {
        return knex('entry')
            .where('id', id)
            .delete()
    }
};
module.exports = EntriesService;