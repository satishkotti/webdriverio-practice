var functions = require('./../../../common/functions/functions');
var login = require('./../../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../../common/actions/documentListTab.actions');
var compareTab = require('./../../../common/actions/compareTab.actions');



describe('PORT: add htm, css and js content types to text comparison - PPE-109212 - US Cabinet', function () {

  before(function () {
    login.login({
      url: functions.getEnvTestUrl(),
      username: functions.getQAPublicationUser().username,
      password: functions.getQAPublicationUser().password
    });

  });

  it('Verify the user is able to select different version for HTML in compare Widget - PPE-109965,Verify the user is able to comparison summary for the HTML in compare widget-PPE-109966', function () {
    repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.htmlFolderpath);
    documentListTab.selectAsset(global.d2ConDataSettings.inputData.htmlAssetName, global.d2ConDataSettings.inputData.htmlAssetTitle);
    compareTab.compareVersions(global.d2ConDataSettings.inputData.htmlAssetName, global.d2ConDataSettings.inputData.htmlVersion1, global.d2ConDataSettings.inputData.htmlVersion2, global.d2ConDataSettings.inputData.htmlAsset1Compare, global.d2ConDataSettings.inputData.htmlAsset2Compare, global.d2ConDataSettings.inputData.htmlCompareAttribute, global.d2ConDataSettings.inputData.htmlCompareContent, global.d2ConDataSettings.inputData.htmlComparerendition);

  });

  it('Verify the user is able to select different version for CSS in compare Widget - PPE-109963,Verify the user is able to comparison summary for the CSS in compare widget-PPE-109964', function () {
    repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.cssFolderpath);
    documentListTab.selectAsset(global.d2ConDataSettings.inputData.cssAssetName, global.d2ConDataSettings.inputData.cssAssetTitle);
    compareTab.compareVersions(global.d2ConDataSettings.inputData.cssAssetName, global.d2ConDataSettings.inputData.cssVersion1, global.d2ConDataSettings.inputData.cssVersion2, global.d2ConDataSettings.inputData.cssAsset1Compare, global.d2ConDataSettings.inputData.cssAsset2Compare, global.d2ConDataSettings.inputData.cssCompareAttribute, global.d2ConDataSettings.inputData.cssCompareContent, global.d2ConDataSettings.inputData.cssComparerendition);

  });

});