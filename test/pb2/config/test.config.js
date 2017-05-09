var user = require('./users');

module.exports.config = {
    testEnv: {
        dev01: 'dev01',
        dev02: 'dev02',
        dev03: 'dev03',
        dev04: 'dev04',
        qa01: 'qa01',
        qa02: 'qa02',
        qa00: 'qa00'
    },
    appAccess: {
        users: {
            default: {
                username: user.users.superuser1.username,
                password: user.users.superuser1.password
            }
        }
    }
}