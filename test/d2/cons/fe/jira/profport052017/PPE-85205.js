var functions = require('./../../../common/functions/functions');
var login = require('./../../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../../common/actions/documentListTab.actions');
var pagebuilderAssets = require('./../../../common/actions/pagebuilderAssets.actions');



describe('Pagebuilder Asset Attributes to show PPE-85205 US', function () {

  before(function () {
    login.login({
      url: functions.getEnvTestUrl(),
      username: functions.getQAPublicationUser().username,
      password: functions.getQAPublicationUser().password
    });

  });

  it('Verify the PageBuilder Pages attributes in Consumer D2 - PPE-111509', function () {
    repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.PBPagesPath);
    documentListTab.selectAsset(global.d2ConDataSettings.inputData.PBPage);
    pagebuilderAssets.pagebuilderPage();
  });
  it('Verify the PageBuilder Templates attributes in Consumer D2 - PPE-111512', function () {
    repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.PBTemplatePath);
    documentListTab.selectAsset(global.d2ConDataSettings.inputData.PBTemplate);
    pagebuilderAssets.pagebuilderTemplate();
  });
  it('Verify the PageBuilder TemplateModule attributes in Consumer D2 -  PPE-111933 ', function () {
    repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.PBTemplateModulePath);
    documentListTab.selectAsset(global.d2ConDataSettings.inputData.PBTemplateModule);
    pagebuilderAssets.pagebuilderTemplateModule();
  });
  it('Verify the PageBuilder Module attributes in Consumer D2 -  PPE-111514', function () {
    repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.PBModulePath);
    documentListTab.selectAsset(global.d2ConDataSettings.inputData.PBModule);
    pagebuilderAssets.pagebuilderModule();
  });
  it('Verify the PageBuilder Schemas attributes in Consumer D2 -  PPE-111935', function () {
    repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.PBSchemasPath);
    documentListTab.selectAsset(global.d2ConDataSettings.inputData.PBSchemas);
    pagebuilderAssets.pagebuilderSchemas();
  });
  it('Verify the PageBuilder XSL attributes in Consumer D2 - PPE-111936', function () {
    repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.PBXSLPath);
    documentListTab.selectAsset(global.d2ConDataSettings.inputData.PBxsl);
    pagebuilderAssets.pagebuilderXSL();
  });
  it('Verify the PageBuilder CSS attributes in Consumer D2 - PPE-111937', function () {
    repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.PBCSSPath);
    documentListTab.selectAsset(global.d2ConDataSettings.inputData.PBcss);
    pagebuilderAssets.pagebuilderCSS();
  });
  it('Verify the PageBuilder JS attributes in Consumer D2 - PPE-111938', function () {
    repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.PBJSPath);
    documentListTab.selectAsset(global.d2ConDataSettings.inputData.PBjs);
    pagebuilderAssets.pagebuilderJS();
  });

  it('Verify the PageBuilder Shared Module attributes in Consumer D2 - PPE-111522', function () {
    repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.PBSharedModulePath);
    documentListTab.selectAsset(global.d2ConDataSettings.inputData.PBSharedModule);
    pagebuilderAssets.pagebuilderSharedModule();
  });


});