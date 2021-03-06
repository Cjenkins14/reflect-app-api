const HabitsService = {
    getAllHabits(knex) {
        return knex.select('*').from("habits")
    },
    getById(knex, id) {
        return knex.from('habits').select('*').where('id', id).first()
    },
    insertHabit(knex, newHabit) {
        return knex
            .insert(newHabit)
            .into('habits')
            .returning('*')
            .then(rows => rows[0])
    },

    deleteHabit(knex, id) {
        return knex('habits')
            .where({ id })
            .delete()
    }
}

module.exports = HabitsService;