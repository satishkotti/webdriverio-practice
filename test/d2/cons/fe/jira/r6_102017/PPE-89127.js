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

describe('Unable to demote or promote object with no label PPE-89127', function () {
    before(function () {
        login.loginWithNewWindow({
            url: functions.getEnvTestUrl(),
            username: functions.getQAPublicationUser().username,
            password: functions.getQAPublicationUser().password
        });
    });

    it('Unable to demote or promote object with no label PPE-89127', function () {
        dqlEditorTab.dqlEditorWidget();
        var id = dqlEditorTab.dqlQueryExecution("select i_chronicle_id, r_object_id, object_name, r_version_label, r_policy_id, r_modify_date from dm_document where any r_version_label IN ('Live') and  NOT any r_version_label IN ('WIP', 'Staging', 'Active', 'Approved', 'Expired')and NOT r_policy_id = '0000000000000000' and r_current_state=3");
        findTab.findByChronicleId(id);
        cidName = propertiesTab.getChronicleIdAndName();
        objName = cidName.objectName;
        chronicleId =cidName.chronicleId;
        documentListTab.demoteAssetForLiveAsset(objName);
        findTab.findByChronicleId(id);
        documentListTab.demoteAsset(objName);
        findTab.findByChronicleId(id);
        documentListTab.promoteAsset(objName);
        findTab.findByChronicleId(id);
        documentListTab.powerPromoteAsset(objName);
    });

});

