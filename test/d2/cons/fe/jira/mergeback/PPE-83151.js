var functions = require('./../../../common/functions/functions');
var login = require('./../../../common/actions/login.actions');
var repositoryBrowserTab = require('./../../../common/actions/repositoryBrowserTab.actions');
var workspaceMenu = require('./../../../common/actions/workspace.menu.actions');
var documentListTab = require('./../../../common/actions/documentListTab.actions');
var RemoveCustomNavigateTab = require('./../../../common/actions/RemoveCustomNavigate.actions');




describe('PORT: Remove customization to navigate to webmd folder - PPE-83151', function () {

  before(function () {
    login.login({
      url: functions.getEnvTestUrl(),
       username: functions.getQAPublicationUser().username,
        password: functions.getQAPublicationUser().password
    });

  });

  it('PPE-110572 Verify the user is navigate to desired folder', function () {
    repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.USFolderpath);
    RemoveCustomNavigateTab.logoutWindow();
    

  });


  it('PPE-110573 Verify user is able to navigate to the desired folder after relaunching the browser for US cabinet', function () {
      browser.pause(5000);
      login.login({
      url: functions.getEnvTestUrl(),
      username: functions.getQAPublicationUser().username,
      password: functions.getQAPublicationUser().password
    });
   
    RemoveCustomNavigateTab.VerifyfolderNavgte(global.d2ConDataSettings.inputData.USFolderpath);

  });


  it('PPE-110579 Verify the user is navigate to desired folder in UK', function () {
    browser.pause(2000);
    repositoryBrowserTab.openFolder(global.d2ConDataSettings.inputData.UKFolderpath);
    RemoveCustomNavigateTab.logoutWindow();
    

  });


  it('PPE-110579 Verify user is able to navigate to the desired folder after relaunching the browser for UK cabinet', function () {

      login.login({
      url: functions.getEnvTestUrl(),
      username: functions.getQAPublicationUser().username,
      password: functions.getQAPublicationUser().password
    });
   
    RemoveCustomNavigateTab.VerifyfolderNavgte(global.d2ConDataSettings.inputData.UKFolderpath);

  });
 

});