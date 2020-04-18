function makeHabitsArray() {
    return [
        {
            id: 1,
            habit: 'Read'
        },
        {
            id: 2,
            habit: 'Write'
        },
        {
            id: 3,
            habit: 'Walk'
        },
        {
            id: 4,
            habit: 'Rest'
        }
    ]
}

function makeEntriesArray() {
    return [
        {
            title: 'new entry 1',
            content: 'this new content',
            monthid: 01
        },
        {
            title: 'new entry 2',
            content: 'this new content',
            monthid: 02
        },
        {
            title: 'new entry 3',
            content: 'this new content',
            monthid: 03
        },
        {
            title: 'new entry 4',
            content: 'this new content',
            monthid: 04
        },
    ]
}

module.exports = { makeEntriesArray, makeHabitsArray }