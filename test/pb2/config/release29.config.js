var user = require('./users');

module.exports.config = {
    testEnv: {
        dev01: 'dev01',
        dev03: 'dev03',
        qa02: 'qa02',
        preprod:'qa00'
    },
    appAccess: {
        users: {
            default: {
                username : user.users.superuser1.username,
                password: user.users.superuser1.password
            }
        }
    }
}
