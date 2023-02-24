const { model, Schema } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
});

module.exports = model('User', UserSchema);