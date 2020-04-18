const HabitsService = {
    getAllHabits(knex) {
        return knex.select('*').from("habits")
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