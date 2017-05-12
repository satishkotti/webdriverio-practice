var functions = require('./../../../common/functions/functions');
var login = require('./../../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../../common/actions/documentListTab.actions');
var compareTab = require('./../../../common/actions/compareTab.actions');



describe('PORT: add htm, css and js content types to text comparison - PPE-109212 - UK Cabinet', function () {

  before(function () {
    login.login({
      url: functions.getEnvTestUrl(),
      username: functions.getQAPublicationUser().username,
      password: functions.getQAPublicationUser().password
    });

  });

  it('Verify the user is able to select different version for HTML in compare Widget - PPE-109965,Verify the user is able to comparison summary for the HTML in compare widget-PPE-109966', function () {
    repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.htmlFolderpath_uk);
    documentListTab.selectAsset(global.d2ConDataSettings.inputData.htmlAssetName_uk, global.d2ConDataSettings.inputData.htmlAssetTitle_uk);
    compareTab.compareVersions(global.d2ConDataSettings.inputData.htmlAssetName_uk, global.d2ConDataSettings.inputData.htmlVersion1_uk, global.d2ConDataSettings.inputData.htmlVersion2_uk, global.d2ConDataSettings.inputData.htmlAsset1Compare_uk, global.d2ConDataSettings.inputData.htmlAsset2Compare_uk, global.d2ConDataSettings.inputData.htmlCompareAttribute_uk, global.d2ConDataSettings.inputData.htmlCompareContent_uk, global.d2ConDataSettings.inputData.htmlComparerendition_uk);

  });

  it('Verify the user is able to select different version for CSS in compare Widget - PPE-109963,Verify the user is able to comparison summary for the CSS in compare widget-PPE-109964', function () {
    repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.cssFolderpath_uk);
    documentListTab.selectAsset(global.d2ConDataSettings.inputData.cssAssetName_uk, global.d2ConDataSettings.inputData.cssAssetTitle_uk);
    compareTab.compareVersions(global.d2ConDataSettings.inputData.cssAssetName_uk, global.d2ConDataSettings.inputData.cssVersion1_uk, global.d2ConDataSettings.inputData.cssVersion2_uk, global.d2ConDataSettings.inputData.cssAsset1Compare_uk, global.d2ConDataSettings.inputData.cssAsset2Compare_uk, global.d2ConDataSettings.inputData.cssCompareAttribute_uk, global.d2ConDataSettings.inputData.cssCompareContent_uk, global.d2ConDataSettings.inputData.cssComparerendition_uk);

  });
  it('Verify the user is able to select different version for JS in compare Widget - PPE-109967,Verify the user is able to comparison summary for the JS in compare widget-PPE-109968', function () {
    repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.jsFolderpath_uk);
    documentListTab.selectAsset(global.d2ConDataSettings.inputData.jsAssetName_uk, global.d2ConDataSettings.inputData.jsAssetTitle_uk);
    compareTab.compareVersions(global.d2ConDataSettings.inputData.jsAssetName_uk, global.d2ConDataSettings.inputData.jsVersion1_uk, global.d2ConDataSettings.inputData.jsVersion2_uk, global.d2ConDataSettings.inputData.jsAsset1Compare_uk, global.d2ConDataSettings.inputData.jsAsset2Compare_uk, global.d2ConDataSettings.inputData.jsCompareAttribute_uk, global.d2ConDataSettings.inputData.jsCompareContent_uk, global.d2ConDataSettings.inputData.jsComparerendition_uk);

  });

});