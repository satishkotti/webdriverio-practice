var functions = require('./../../../common/functions/functions');
var login = require('./../../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../../common/actions/documentListTab.actions');
var pagebuilderAssets = require('./../../../common/actions/pagebuilderAssets.actions');



describe('Pagebuilder Asset Attributes to show - PPE-85205 UK', function () {

  before(function () {
    login.login({
      url: functions.getEnvTestUrl(),
      username: functions.getQAPublicationUser().username,
      password: functions.getQAPublicationUser().password
    });

  });

  it('Verify the PageBuilder Pages attributes in Consumer D2 - PPE-111509', function () {
    repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.PBPagesPath_uk);
    documentListTab.selectAsset(global.d2ConDataSettings.inputData.PBPage_uk);
    pagebuilderAssets.pagebuilderPage();
  });
  it('Verify the PageBuilder Templates attributes in Consumer D2 - PPE-111512', function () {
    repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.PBTemplatePath_uk);
    documentListTab.selectAsset(global.d2ConDataSettings.inputData.PBTemplate_uk);
    pagebuilderAssets.pagebuilderTemplate();
  });
  it('Verify the PageBuilder TemplateModule attributes in Consumer D2 -  PPE-111933 ', function () {
    repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.PBTemplateModulePath_uk);
    documentListTab.selectAsset(global.d2ConDataSettings.inputData.PBTemplateModule_uk);
    pagebuilderAssets.pagebuilderTemplateModule();
  });
  it('Verify the PageBuilder Module attributes in Consumer D2 -  PPE-111514', function () {
    repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.PBModulePath_uk);
    documentListTab.selectAsset(global.d2ConDataSettings.inputData.PBModule_uk);
    pagebuilderAssets.pagebuilderModule();
  });
  it('Verify the PageBuilder Schemas attributes in Consumer D2 -  PPE-111935', function () {
    repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.PBSchemasPath_uk);
    documentListTab.selectAsset(global.d2ConDataSettings.inputData.PBSchemas_uk);
    pagebuilderAssets.pagebuilderSchemas();
  });
  it('Verify the PageBuilder XSL attributes in Consumer D2 - PPE-111936 ', function () {
    repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.PBXSLPath_uk);
    documentListTab.selectAsset(global.d2ConDataSettings.inputData.PBxsl_uk);
    pagebuilderAssets.pagebuilderXSL();
  });
  it('Verify the PageBuilder CSS attributes in Consumer D2 - PPE-111937', function () {
    repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.PBCSSPath_uk);
    documentListTab.selectAsset(global.d2ConDataSettings.inputData.PBcss_uk);
    pagebuilderAssets.pagebuilderCSS();
  });
  it('Verify the PageBuilder JS attributes in Consumer D2 - PPE-111938', function () {
    repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.PBJSPath_uk);
    documentListTab.selectAsset(global.d2ConDataSettings.inputData.PBjs_uk);
    pagebuilderAssets.pagebuilderJS();
  });

  it('Verify the PageBuilder Shared Module attributes in Consumer D2 - PPE-111522', function () {
    repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.PBSharedModulePath_uk);
    documentListTab.selectAsset(global.d2ConDataSettings.inputData.PBSharedModule_uk);
    pagebuilderAssets.pagebuilderSharedModule();
  });


});