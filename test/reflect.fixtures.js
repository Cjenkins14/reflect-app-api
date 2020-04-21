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
            id: 1,
            title: 'new entry 1',
            content: 'this new content',
            monthid: 01
        },
        {
            id: 2,
            title: 'new entry 2',
            content: 'this new content',
            monthid: 02
        },
        {
            id: 3,
            title: 'new entry 3',
            content: 'this new content',
            monthid: 03
        },
        {
            id: 4,
            title: 'new entry 4',
            content: 'this new content',
            monthid: 04
        },
    ]
}
function makeMonthsArray() {
    return [
        {
            name: 'Jan',
            id: 1
        },
        {
            name: 'Feb',
            id: 2
        },
        {
            name: 'Mar',
            id: 3
        },
        {
            name: 'Apr',
            id: 4
        },
        {
            name: 'May',
            id: 5
        },
        {
            name: 'Jun',
            id: 6
        },
        {
            name: 'Jul',
            id: 7
        },
        {
            name: 'Aug',
            id: 8
        },
        {
            name: 'Sep',
            id: 9
        },
        {
            name: 'Oct',
            id: 10
        },
        {
            name: 'Nov',
            id: 11
        },
        {
            name: 'Dec',
            id: 12
        }
    ]
}

module.exports = { makeEntriesArray, makeHabitsArray, makeMonthsArray }