var app = require('./../actions/login.actions');
var iwc = require('./../actions/iwc.actions');
var act = require('./../actions/assetactions.actions');
var props = require('./../actions/assetprops.actions');
var search = require('./../actions/search.actions');
var menu = require('./../actions/menus.actions');
var queue = require('./../actions/queue.actions');
var assetxml = require('./../actions/assetxmlreaders.actions');
var moduleConfigs = require('./../actions/moduleconfigs.actions');
var rdt = require('./../actions/redirecttool.actions');
var usersDetails = require('./../../config/users');
var ats = require('./../actions/ats.actions');
var user = usersDetails.users;
var parseXml = require('./../../../common/xml/parseXml');

//Launch App and login
module.exports.LaunchApp = () => {
    app.LaunchApp();
}

module.exports.LaunchAppAndLogin = (user) => {
    switch (user) {
        default: app.LaunchApp(); app.Login(global.username, global.password);
            break;
        case 'superuser':
            app.LaunchApp(); app.Login(user.superuser.username, user.superuser.password);
            break;
        case 'superuser1':
            app.LaunchApp(); app.Login(user.superuser1.username, user.superuser1.password);
            break;
    }

}

//Enter credentials in the login screen and click on the login button
module.exports.Login = (user) => {
    switch (user) {
        default: app.Login(global.username, global.password);
        case 'superuser':
            app.Login(user.superuser.username, user.superuser.password);
        case 'superuser1':
            app.Login(user.superuser1.username, user.superuser1.password);
    }
}

//Enter Interior Workcenter
module.exports.EnterIWC = (menu, option) => {
    iwc.EnterIWC(menu, option);

}

//Traverse the Site Structure. Level must be mentioned from the root node. Eg: 'Level 0/zTest/QA & Dev'
module.exports.TraverseSS = (level) => {
    iwc.TraverseSS(level);
}

/*
Create a page or template or shared module.
'assetType' can be 'Page' or 'Template' or 'Shared Module'
'assetDetails' can be json from pb2/data/****.assets.js
*/

module.exports.Create = (assetType, assetDetails) => {
    switch (assetType) {
        case 'Page':
            iwc.AddToNode(assetType);
            return props.PopulatePageProps(assetDetails);
            break;
        case 'Template':
            iwc.AddToNode(assetType);
            return props.PopulateTemplateProps(assetDetails);
            break;
        case 'Shared Module':
            menu.SelectCreateMenuItem('Shared Modules');
            return props.PopulateSMProps(assetDetails);
            break;
    }
}

/*
Add a page or template.
'contentPane' is the name of the content pane. Eg: ContentPane0
'moduleDetails' can be json from pb2/data/****.assets.js
*/
module.exports.AddModule = (contentPane, moduleDetails) => {
    props.AddModule(contentPane, moduleDetails);
}

/*
Search for an asset using either Global Search or Site Structure
'assetType' can have 'Page', 'Template', 'SM', 'DPM'. (can be null if chronicle id is passed as argument for 'keyword')
'keyword' can be Chronicle ID or keyword like test
'from' can be 'Global Search' or 'Interior Workcenter'
'level' is the level to traverse in the Site Structure from the root node (can be as null if Global Search is used)
*/

module.exports.SearchFor = (assetType, keyword, from, level) => {
    switch (from) {
        case 'Global Search':
            if (assetType == null && (keyword.length == 16 && keyword.startsWith('091'))) {
                search.GlobalSearchUsingChronID(keyword);
            } else {
                search.GlobalSearchUsingKeyword(assetType, keyword);
            }
            break;
        case 'Interior Workcenter':
            if (level != null) {
                search.SearchFromIWC(level, keyword);
            }
            break;
    }
}

//Edit the asset if 'Edit' button is displayed in the screen
module.exports.EditTheAsset = () => {
    act.ClickEditButton();
}

//Edit the asset if 'Checkout & Edit' button is displayed in the screen
module.exports.CheckoutAndEditTheAsset = () => {
    act.ClickCheckoutAndEditButton();
}

//Switch between tabs while editing the asset. eg for 'tabName': Preview
module.exports.SwitchAssetTabs = (tabName) => {
    props.SwitchAssetTabs(tabName);
}

/*
Checkin or Publish the asset
'action' can be 'Checkin' (or 'Save') or 'Publish to Staging' or 'Publish to Live'
'comment' can be user comment entered while saving/publishin the asset
*/
module.exports.SaveOrPublishTheAsset = (action, comment) => {
    act.SavePublish(action, comment);
}

/*
Publish the asset from More Actions menu
'action' can be 'Publish to Staging' or 'Publish to Live'
'comment' can be user comment entered while saving/publishin the asset
*/
module.exports.SaveOrPublishTheAssetFromMoreActions = (action, comment) => {
    act.SavePublishFromMoreActions(action, comment);
}

/*
Obtain the asset version (eg: 3.0) and stage (eg: staging)
'assetName' can be 'selected' (if the asset is selected in Interior Workcenter or Search Results screen) or can be null if user is in asset readonly/edit mode.
'from' can be 'Asset Screen' (if user is in asset readonly/edit mode) or null
*/
module.exports.GetAssetVersionAndStage = (assetName, from) => {
    switch (from) {
        case 'Asset Screen':
            return props.GetAssetVersionAndStage();
            break;
        default:
            return iwc.GetVersionAndStageOfAsset(assetName);
            break;
    }
}

//Enter the activity queue
module.exports.EnterActivityQueueStatusPage = () => {
    menu.EnterActivityQueueStatusPage();
}

//Filter the results in the activity queue. 'filter' can be 'Áll', 'Completed', 'Failed', 'In Progress'
module.exports.FilterResultsInQueue = (filter) => {
    queue.Show(filter);
}

//Gets the latest details of an asset if present in the queue or else return a json with null values
module.exports.GetAssetDetailsFromQueue = (chronID) => {
    return queue.GetAssetDetailsFromQueue(chronID);
}

//Refresh the queue by clicking on the 'Refresh' button
module.exports.RefreshTheQueue = () => {
    queue.RefreshTheQueue();
}

//Enable or Disable auto refresh functionality in the queue
module.exports.EnableDisableAutoRefresh = (action) => {
    queue.ClickAutoRefresh(action);
}

//Returns the current site being tested. eg: WebMD Desktop
module.exports.GetCurrentSite = () => {
    return app.GetCurrentSite();
}

//Returns the Chronicle ID of the selected asset. 'screen' can be 'IWC' (uses IWC even if null is mentioned) or 'Search Results'
module.exports.GetChronIDOfTheSelectedAsset = (screen) => {
    return iwc.GetChronIDOfTheSelectedAsset(screen);
}

//Selects the required asset from the list. 'assetName' is the name of the asset to be selected
module.exports.SelectAsset = (assetName) => {
    iwc.SelectAsset(assetName);
}

//Navigates to the homepage
module.exports.NavigateToHomepage = () => {
    menu.GoHome();
}

/*
Sorts the required column in the mentioned table
'table' can be the name of the table. eg: Checked Out Objects
'column' can be the column to be sorted. eg: Last Modified
'sortType' can be Ascending or Descending
*/
module.exports.SortTableColumn = (table, column, sortType) => {
    menu.SortColumn(table, column, sortType);
}

//Select a More Actions menu-item. eg: Asset History
module.exports.SelectMoreActionsMenuItem = (menuItem) => {
    act.SelectMoreActionsMenuItem(menuItem);
}

//Clicks on Show Expired button in IWC or Search Results screen
module.exports.ClickShowExpired = () => {
    act.ClickShowExpired();
}


/*
Propagates templates modules. 'specs' is a json.
eg for spec:
{
    "modules":
        [
            {
                "moduleName": "PM0004",
                "modulePosition": "Top of Content Pane" 
            },
            {
                "moduleName": "PM0006",
                "modulePosition": "Bottom of Content Pane" 
            }
        ],
        "childTemplates": ['Test Template', 'Test Template2'],
        "childPageStage": "Live"
}
*/
module.exports.Propagate = (specs) => {
    props.Propagate(specs);
}

//Cancel's the checkout on an asset
module.exports.CancelCheckout = () => {
    act.CancelCheckout();
}

/*

*/
module.exports.SelectNodeAction = ([actionName, publishNode, templateStatus, pageStatus]) => {
    act.SelectNodeAction([actionName, publishNode, templateStatus, pageStatus]);
}

//Navigate to ATS Status Checker Page
module.exports.NavigatetoATSStatusCheckerPageOf = (chronID, stage) => {
    return ats.Navigate(chronID, stage); //Returns the URL of the page which existed before navigating to the ATS Status Checker page
}
module.exports.ClickButtonInATSPage = (buttonText) => {
    ats.ClickOn(buttonText);
}

module.exports.ConfigureModule = (moduleType, moduleprops) => {
    switch (moduleType.toLowerCase()) {
        case 'multiple video launch':
            moduleConfigs.ConfigureMultipleVideoLaunchModule(moduleprops);
            break;
        case 'update multiple video launch module':
            moduleConfigs.ConfigureUpdateMultipleVideoLaunchModule(moduleprops);
            break;
        case 'sponsor box module':
            moduleConfigs.ConfigureSponsorBoxModule(moduleprops);
            break;
        case 'navigation module':
            moduleConfigs.ConfigureNavigationModule(moduleprops);
            break;
        case 'editorial module':
            moduleConfigs.ConfigureEditorialModule(moduleprops);
            break;
        case 'vertical promo module':
            moduleConfigs.ConfigureVerticalPromoModule(moduleprops);
            break;
        case 'editnavigationmodule':
            moduleConfigs.ConfigureEditNavigationModule(moduleprops);
            break;
        case 'editsponsorboxmodule':
            moduleConfigs.Configureeditsponsorboxmodule(moduleprops);
            break;
        case 'editverticalpromomodule':
            moduleConfigs.ConfigureEditverticalpromomodule(moduleprops);
            break;
        case 'editeditorialmodule':
            moduleConfigs.configureediteditorialmodule(moduleprops);
            break;
        case 'html module':
            moduleConfigs.configureHtmlModule(moduleprops);
            break;
        case 'edithtmlmodule':
            moduleConfigs.EditconfigureHtmlModule(moduleprops);
            break;
        case 'standardpromomodule':
            moduleConfigs.configureStandardPromomodule(moduleprops);
            break;
        case 'editstandardpromomodule':
            moduleConfigs.configureEditStandardPromoModule(moduleprops);
            break;
        case 'twocolumnheadermodule':
            moduleConfigs.ConfigureTwoColumnHeaderModule(moduleprops);
            break;
        case 'edittwocolumnheadermodule':
            moduleConfigs.ConfigureEditColumnHeaderModule(moduleprops);
            break;
    }

}

module.exports.WaitForATSFile = (fileType) => {
    ats.WaitFor(fileType);
}

module.exports.GetXML = (chronId, stage, inputType) => {
    var xmlUrl;
    if (inputType == 'FILE') {
        xmlUrl = chronId;
    } else
        switch (global.testEnv) {
            case 'qa02':
            case 'Qa02':
            case 'QA02':
                if (stage.toLowerCase() != 'live') {
                    xmlUrl = "http://ats." + stage + ".perf.webmd.com/ATSFile.aspx?ID=" + chronId;
                } else {
                    xmlUrl = "http://ats.perf.webmd.com/ATSFile.aspx?ID=" + chronId;
                }
                break;
            default:
                if (stage.toLowerCase() != 'live') {
                    xmlUrl = "http://ats." + stage + "." + global.testEnv + ".webmd.com/ATSFile.aspx?ID=" + chronId;
                } else {
                    xmlUrl = "http://ats." + global.testEnv + ".webmd.com/ATSFile.aspx?ID=" + chronId;
                }
                break;

        }
    var xml;
    browser.call(() => {
        return Promise.resolve(parseXml.getXmlFromUrl(xmlUrl, null, inputType))
            .then(function (result) {
                xml = result;
            }).catch(err => {
                console.log(err);
            });
    });
    return xml;
}

module.exports.GetXMLValues = (assetType, xml) => {
    switch (assetType.toLowerCase()) {
        case 'multiple video launch module':
            return assetxml.MultipleVideoLaunchXMLValues(xml);
            break;
        case 'update multiple video launch module':
            return assetxml.EditMultipulVideoLaunchXMLValues(xml);
            break;
        case 'sponsor box module':
            return assetxml.SponsorModuleLaunchXMLValues(xml);
            break;
        case 'navigation module':
            return assetxml.NavigationModuleLaunchXMLValues(xml);
            break;
        case 'editorial module':
            return assetxml.ConfigureEditorialModule(xml);
            break;
        case 'vertical promo module':
            return assetxml.ConfigureVerticalPromoModule(xml);
            break;
        case 'editnavigation module':
            return assetxml.EditNavigationModuleLaunchXMLValues(xml);
            break;
        case 'html module':
            return assetxml.HTMlModuleXMLValues(xml);
            break;
        case 'standardpromomodule':
            return assetxml.StandardPromomodule(xml);
            break;
        case 'twocolumnheadermodule':
            return assetxml.twocolumnheadermodule(xml);
            break;
    }

}


module.exports.NavigateToRedirectToolPage = () => {
    rdt.GoToRedirectToolPage();
}

//Navigates to the homepage
module.exports.NavigateToRedirectTool = () => {
    menu.GoHome();
}