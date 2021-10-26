const { Text, Password, Checkbox, Relationship } = require('@keystonejs/fields')

module.exports = {
    fields: {
        firstName: {
            type: Text,
            isRequired: true
        },
        lastName: {
            type: Text,
            isRequired: true
        },
        username: {
            type: Text,
            isRequired: true
        },
        password: {
            type: Password,
            isRequired: true
        },
        isAdmin: {
            type: Checkbox,
            defaultValue: false,
        },
        books: {
            type: Relationship,
            ref: 'Book.readers',
            many: true
        }
    },
    labelField: 'username'
}