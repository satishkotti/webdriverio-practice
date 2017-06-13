var user = require('./users');

module.exports.config = {
    testEnv: {
        dev: 'dev03',
        qa: 'qa02',
        preprod: 'qa00'
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