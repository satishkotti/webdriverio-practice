var rmqCloneUI = require('./../ui/rmqclone');

module.exports = {

    rmqclone: function (friendlyName, busRef, userDescr, keywords, lnkTtl, windowTtl, publication,
    copyright, primaryTopicId,date) {
        rmqCloneUI.rmqclone(friendlyName, busRef, userDescr, keywords, lnkTtl, windowTtl, publication,
    copyright, primaryTopicId,date);
    }
    
}