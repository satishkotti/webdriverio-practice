var functions = require('./../../../common/functions/functions');
var login = require('./../../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../../common/actions/documentListTab.actions');
var pagebuilderAssets = require('./../../../common/actions/pagebuilderAssets.actions');



describe('Pagebuilder Asset Attributes to show', function () {

  before(function () {
    login.login({
      url: functions.getEnvTestUrl(),
      username: functions.getQAPublicationUser().username,
      password: functions.getQAPublicationUser().password
    });

  });

  it('Verify the PageBuilder Pages attributes in Consumer D2 - PPE-111509', function () {
    repositoryBrowserTab.openFolder("webmd/PageBuilder_Assets/scopemaps/WebMD Consumer/Pages/0 0 Enlarged Prostate TOC");
    documentListTab.selectAsset("page_0 0 Enlarged Prostate TOC_091e9c5e802098d6.xml");
    pagebuilderAssets.pagebuilderPage();
  });

});