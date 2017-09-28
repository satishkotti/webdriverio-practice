var functions = require('./../../../common/functions/functions');
var login = require('./../../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../../common/actions/documentListTab.actions');
var contentTab = require('./../../../common/actions/contentTab.actions');
var propertiesTab = require('./../../../common/actions/propertiesTab.actions');
var findTab = require('./../../../common/actions/findTab.actions');
var dqlEditorTab = require('./../../../common/actions/dqlEditor.actions');
var randomstring = require("randomstring");

describe('Article doesnt display content in Content window PPE-130444', function () {
    before(function () {
        login.loginWithNewWindow({
            url: functions.getEnvTestUrl(),
            username: functions.getQAPublicationUser().username,
            password: functions.getQAPublicationUser().password
        });
    });

    it('Article doesnt display content in Content window PPE-130444', function () {
        dqlEditorTab.dqlEditorWidget();
        var id = dqlEditorTab.dqlQueryExecution("select i_chronicle_id from dm_document where r_object_id in(select parent_id from dm_relation where description = 'fixing_ver_mgt_1' and relation_name = 'wcm_doc_template')");
        findTab.findByChronicleId(id);
        contentTab.checkOut();
        contentTab.checkIn();
    });

});

