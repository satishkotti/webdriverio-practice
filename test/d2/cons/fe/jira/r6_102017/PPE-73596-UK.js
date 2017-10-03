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

describe('Error message displayed when trying to update collection ID with an existing ID of other cabinet PPE-73596', function () {
    var AssetTitle;
    var AssetName;
    before(function () {
        login.loginWithNewWindow({
            url: functions.getEnvTestUrl(),
            username: functions.getQAPublicationUser().username,
            password: functions.getQAPublicationUser().password
        });
        
    });

    it('Error message displayed when trying to update collection ID with an existing ID of other cabinet PPE-73596', function () {
        dqlEditorTab.dqlEditorWidget();
        var USCollectionid = dqlEditorTab.dqlQueryExecution("select wbmd_col_id,wbmd_site from wbmd_cons_collection where wbmd_site='1001' and wbmd_col_id not in(select wbmd_col_id from wbmd_cons_collection group by wbmd_col_id having count(wbmd_col_id)>1)");
        var UKCollectionid = dqlEditorTab.dqlQueryExecution("select wbmd_col_id,wbmd_site from wbmd_cons_collection where wbmd_site='1006' and wbmd_col_id not in(select wbmd_col_id from wbmd_cons_collection group by wbmd_col_id having count(wbmd_col_id)>1)");
        
        repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.UKtestFolderPath);
        AssetTitle = global.d2ConDataSettings.inputData.AssetObjectName + randomstring.generate(2);
        AssetName = global.d2ConDataSettings.inputData.AssetDescription + randomstring.generate(2);
        workspaceMenu.createContentCollection(
            global.d2ConDataSettings.inputData.UKCollectionArticleProfileName,
            global.d2ConDataSettings.inputData.CollectionTemplateChannel,
            AssetTitle,
            AssetName);
        documentListTab.selectAsset(AssetTitle);
        propertiesTab.setRequiredPropertiesCollection(AssetTitle,"Micro Center",AssetTitle,AssetTitle,AssetTitle,AssetTitle,'UK WebMD Feature','2014 WebMD - UK','ADD-ADHD (Adult)');
       
        var newcollectionid= propertiesTab.getcollectionid();
        propertiesTab.collectionIDValidation(newcollectionid,UKCollectionid);

        propertiesTab.setCollectionid(UKCollectionid);
        propertiesTab.collectionIDValidationmessage(UKCollectionid);

        propertiesTab.setCollectionid(USCollectionid);
        documentListTab.selectAsset(AssetTitle);
    });

});

