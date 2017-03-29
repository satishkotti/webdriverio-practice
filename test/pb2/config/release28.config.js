var user = require('./users');

module.exports.config = {
    testEnv: 'Dev01',
    appAccess: {
        users: {
            default: {
                username : user.users.superuser1.username,
                password: user.users.superuser1.password
            }
        }
    }
}
