
const app = require('./../../actions/salesforce/login.actions');

/*----------------------------------------------------------------------------------------------------- */
/**************************************** A P P   L A U N C H *****************************************/
/*----------------------------------------------------------------------------------------------------- */

/* ------------------
** A P P  L A U N C H
** ------------------
** Description:
** Just launches the sales force  app (does not do the login part)
*/
module.exports.LaunchApp = () => {
    app.LaunchApp();
}

/* -----------------
** A P P  L O G I N
** -----------------
** Description:
** Just logs-in into the sales force  App 
*/

module.exports.Login = (username, password) => {
    
        app.Login(global.username_salesforce,global.password_salesforce);
    
}

/* -----------------
** A P P     Logout
** -----------------
** Description:
** Just logs-in into the sales force  App 
*/

module.exports.Logout = () => {
    app.Logout;
   
}