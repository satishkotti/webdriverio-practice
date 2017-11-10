
const app = require('./../../actions/ttsadmin/login.actions');
const groupSearch = require('./../../actions/ttsadmin/ttsgroupsearch.actions');


/*----------------------------------------------------------------------------------------------------- */
/**************************************** A P P   L A U N C H *****************************************/
/*----------------------------------------------------------------------------------------------------- */

/* ------------------
** A P P  L A U N C H
** ------------------
** Description:
** Just launches the TTS admin app (does not do the login part)
*/
module.exports.LaunchApp = () => {
    app.LaunchApp();
}/* -----------------
** group   Search
** -----------------
** Description:
** Just search for the group data 
*/

module.exports.GetGroupSearchData = (row) => {
    return groupSearch.GetGroupUrlData(row);
   
}
/* -----------------
** get group url  search  resultset data 
** -----------------
** Description:
** Get  search for the tts group  search result set  
*/

module.exports.GroupSearch = (group) => {
    return groupSearch.TTSGroupSrch(group);
  
}




/* -----------------
** A P P  L O G I N
** -----------------
** Description:
** Just logs-in into the TTS admin  App 
*/

module.exports.Login = () => {
    
        app.Login(global.username_ttsAdmin, global.password_ttsAdmin);
    }   


/* -----------------
** A P P     Logout
** -----------------
** Description:
** Just logs-in into the TTS admin  App 
*/

module.exports.Logout = () => {
    app.Logout;
   
}

