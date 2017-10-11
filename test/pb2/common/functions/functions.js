
const app = require('./../actions/login.actions');
const iwc = require('./../actions/iwc.actions');
const act = require('./../actions/assetactions.actions');
const props = require('./../actions/assetprops.actions');
const search = require('./../actions/search.actions');
const menu = require('./../actions/menus.actions');
const queue = require('./../actions/queue.actions');
const rdt = require('./../actions/redirecttool.actions');
const assetxml = require('./../actions/assetxmlreaders.actions');
const moduleConfigs = require('./../actions/moduleconfigs.actions');
const pb2api = require('./../../../common/api/dctm-api');
const pb2siemngmntapi = require('./../../../common/api/sitemanagementapi');
const usersDetails = require('./../../config/users');
const ats = require('./../actions/ats.actions');
const user = usersDetails.users;
const parseXml = require('./../../../common/xml/parseXml');


/*----------------------------------------------------------------------------------------------------- */
/**************************************** A P P   L A U N C H *****************************************/
/*----------------------------------------------------------------------------------------------------- */

/* ------------------
** A P P  L A U N C H
** ------------------
** Description:
** Just launches the app (does not do the login part)
*/
module.exports.LaunchApp = () => {
    app.LaunchApp();
}

/* -----------------
** A P P  L O G I N
** -----------------
** Description:
** Just logs-in into the App (does not launch the app)
*/
module.exports.Login = (role) => {
    switch (role) {
        default: app.Login(global.username, global.password);break;
        case 'superuser': app.Login(user.superuser.username, user.superuser.password); break;
        case 'superuser1': app.Login(user.superuser1.username, user.superuser1.password); break;
        case 'programminguser': app.Login(user.programminguser.username, user.programminguser.password); break;
    }
}

/* ------------------------------------
** A P P  L A U N C H  A N D  L O G I N
** ------------------------------------
** Description:
** Launch App and Login
*/
module.exports.LaunchAppAndLogin = (role, site) => {
    switch (role) {
        default: app.LaunchApp(); app.Login(global.username, global.password, site); break;
        case 'superuser': app.LaunchApp(); app.Login(user.superuser.username, user.superuser.password, site); break;
        case 'superuser1': app.LaunchApp(); app.Login(user.superuser1.username, user.superuser1.password, site); break;
        case 'programminguser': app.LaunchApp(); app.Login(user.programminguser.username, user.programminguser.password, site); break;
    }

}

/* ------------------------------------
L O G O U T 
** ------------------------------------
** Description:
** Log out of the PB application
*/
module.exports.Logout = () => {
        app.Logout();
}

/*----------------------------------------------------------------------------------------------------------------------- */
/**************************************** I N T E R I O R   W O R K C E N T E R *****************************************/
/*----------------------------------------------------------------------------------------------------------------------- */

/* -----------------------------------------------
** E N T E R  I N T E R I O R  W O R K C E N T E R
** -----------------------------------------------
** Description:
** Enter the Interior Work Center using:
**      1. Create (menu) > Templates & Pages (option)
**      2. Edit (menu) > Templates & Pages (option)
**      3. Edit (menu) > Site Structure (option)
*/
module.exports.EnterIWC = (menu, option) => {
    iwc.EnterIWC(menu, option);

}

/* ---------------------------------------------
** S I T E  S T R U C T U R E  T R A V E R S A L
** ---------------------------------------------
** Description:
** Traverse to the required level in the site structure
**      NOTE:
**      If level arugument is passed, user will traverse to the mentioned Site Structure
**      If level argument is NOT passed, user will traverse to the default Site Structure
*/
module.exports.TraverseSS = (level) => {
    iwc.TraverseSS(level);
}

/*--------------------------------------------------------------------------------------------------------------------- */
/**************************************** A S S E T S   A N D   M O D U L E S *****************************************/
/*--------------------------------------------------------------------------------------------------------------------- */

/* -------------------------------------------------------------------
** C R E A T E  A S S E T S  T H R O U G H  U S E R  I N T E R F A C E 
** -------------------------------------------------------------------
** Description:
** Create a page or template or shared module
** Funtion accepts 2 arguments and return the chronicle id fo the new asset:
**      1. 'assetType' can be 'Page' or 'Template' or 'Shared Module'
**      2. 'assetDetails' is a json which contains values to be populated in the various fields present in the UI
*/
module.exports.Create = (assetType, assetDetails) => {
    let assetChronID;
    switch (assetType) {
        case 'Page': iwc.AddToNode(assetType); assetChronID = props.PopulatePageProps(assetDetails); break;
        case 'Template': iwc.AddToNode(assetType); assetChronID = props.PopulateTemplateProps(assetDetails); break;
        case 'Shared Module': menu.SelectCreateMenuItem('Shared Modules'); assetChronID = props.PopulateSMProps(assetDetails); break;
        case 'Dynamic Programmed Module': menu.SelectCreateMenuItem('Dynamic Programmed Modules'); assetChronID = props.PopulateSMProps(assetDetails); break;
    }
    return assetChronID;
}

/* --------------------------------------------------------------------
** T O G G L E  A D D I T I O N A L  P R O P E R T I E S  S E C T I O N 
** --------------------------------------------------------------------
** Description:
** Expands or collpases 'Additional Properties' section present in the asset properties screen
** Funtion accepts 1 argument. There is no return value for this function:
**      1. 'toggleOption' can be either 'Expand' or 'expand' or 'Collpase' or 'collpase'
*/

module.exports.ToggleAdditionalProperties = function()
{
    act.ToggleAdditionalProperties();
}

/* -------------------------------------------------
** A D D  P A G E  O R  T E M P L A T E  M O D U L E 
** -------------------------------------------------
** Description:
** Add a page or template module
** Funtion accepts 2 arguments:
**      1. 'contentPane' is the name of the content pane. Eg: ContentPane0
**      2. 'moduleDetails' is a json which contains values to be populated in the various fields present in the UI
*/
module.exports.AddModule = (contentPane, moduleDetails) => {
    props.AddModule(contentPane, moduleDetails);
}

/* -------------------------------------------------------------
** C O N F I G U R E  P A G E  O R  T E M P L A T E  M O D U L E 
** -------------------------------------------------------------
** Description:
** Configures a page or template module based on the provided inputs
** Funtion accepts 2 arguments:
**      1. Type of the module (as present in the Module Type dropdown list eg: LinkList, HTML etc.,)
**      2. Module Configuration Data in json format
*/
module.exports.ConfigureModule = (moduleType, moduleprops) => {
    switch (moduleType.toLowerCase()) {
        case 'multiple video launch': moduleConfigs.ConfigureMultipleVideoLaunchModule(moduleprops); break;
        case 'sponsor boxes':
        case 'sponsor box':
        case 'sponsor box module': moduleConfigs.ConfigureSponsorBoxModule(moduleprops); break;
        case 'navigation module': moduleConfigs.ConfigureNavigationModule(moduleprops); break;
        case 'editorial module': moduleConfigs.ConfigureEditorialModule(moduleprops); break;
        case 'vertical promo module': moduleConfigs.ConfigureVerticalPromoModule(moduleprops); break;
        case 'editnavigationmodule': moduleConfigs.ConfigureEditNavigationModule(moduleprops); break;
        case 'editsponsorboxmodule': moduleConfigs.Configureeditsponsorboxmodule(moduleprops); break;
        case 'editverticalpromomodule': moduleConfigs.ConfigureEditverticalpromomodule(moduleprops); break;
        case 'editeditorialmodule': moduleConfigs.configureediteditorialmodule(moduleprops); break;
        case 'html module': moduleConfigs.configureHtmlModule(moduleprops); break;
        case 'edithtmlmodule': moduleConfigs.EditconfigureHtmlModule(moduleprops); break;
        case 'linklist module': moduleConfigs.ConfigureLinkListModule(moduleprops); break;
        case 'two column header':
        case 'two column header module': moduleConfigs.ConfigureTwoColumnHeaderModule(moduleprops); break;
        case 'standard promo':
        case 'standard promo module': moduleConfigs.ConfigureStandarPromoModule(moduleprops); break;
    }

}

/* ------------------------------------------------------------------------------
** S A V E  P A G E  O R  T E M P L A T E  M O D U L E  C O N F I G U R A T I O N
** ------------------------------------------------------------------------------
** Description:
** Saves the module configuration settings by clicking on the Save button present in the UI
*/
module.exports.SaveModuleConfig = function () {
    act.ClickSaveButton();
}

/*------------------------------------------------------------------------------------------------------------------ */
/**************************************** A S S E T   O P E R A T I O N S *****************************************/
/*------------------------------------------------------------------------------------------------------------------ */

/* -----------------------------
** S E A R C H  F O R  A S S E T
** -----------------------------
** Description:
** Search for an asset using either Global Search or Site Structure
** Funtion accepts 4 arguments:
**      1. 'assetType' can have 'Page', 'Template', 'SM', 'DPM'. (can be null if chronicle id is passed as argument for 'keyword')
**      2. 'keyword' can be Chronicle ID or any keyword like test or page etc.,
**      3. 'from' can be 'Global Search' or 'Interior Workcenter'
**      4. 'level' is the level to traverse in the Site Structure from the root node (can be as null if Global Search is used)
*/
module.exports.SearchFor = (assetType, keyword, from, level) => {
    switch (from.toLowerCase()) {
        case 'global search':
            if (assetType == null && (keyword.length == 16 && keyword.startsWith('091'))) {
                search.GlobalSearchUsingChronID(keyword);
            }
            else {
                search.GlobalSearchUsingKeyword(assetType, keyword);
            }
            break;
        case 'interior workcenter':
            if (level != null) {
                search.SearchFromIWC(level, keyword);
            }
            break;
    }
}

/* -----------------------------------
** S H O W  E X P I R E D  A S S E T S
** -----------------------------------
** Description:
** Clicks on 'Show Expired' in the search results screen or interior workcenter
*/
module.exports.ClickShowExpired = () => {
    act.ClickShowExpired();
}

/* -------------------------------
** S O R T  T A B L E  C O L U M N
** -------------------------------
** Description:
** Sorts the required column in the mentioned table
** Funtion accepts 3 arguments:
**      1. 'table' can be the name of the table. eg: Checked Out Objects
**      2. 'column' can be the column to be sorted. eg: Last Modified
**      3. 'sortType' can be Ascending or Descending
*/
module.exports.SortTableColumn = (table, column, sortType) => {
    menu.SortColumn(table, column, sortType);
}

/* -------------------------
** E D I T  T H E  A S S E T 
** -------------------------
** Description:
** Clicks on the Edit button to enter the editable mode of the asset
*/
module.exports.EditTheAsset = () => {
    act.ClickEditButton();
}

/* ---------------------------------------------
** C H E C K O U T  &  E D I T  T H E  A S S E T 
** ---------------------------------------------
** Description:
** Clicks on Checkout & Edit button to enter the editable mode of the asset
*/
module.exports.CheckoutAndEditTheAsset = () => {
    act.ClickCheckoutAndEditButton();
}
/* ---------------------------------------------
** A D D  C S S  O N  A N  A S S E T
** ---------------------------------------------
** Description:
** Adds CSS on an asset
** Funtion accepts 1 argument:
**      1. 'cssContent' can be the css content to be added on asset
**      2. 'type' can be the page or template
*/
module.exports.AddCSSOnAsset = (cssContent, type) => {

    if(type === 'page'){
        act.ToggleAdditionalProperties();
    }
    act.ClickAddCSS(type);
    act.AddCSSContent(cssContent);
    act.SaveCSS();
    cssChronID = act.GetCSSChronID(type);
    return cssChronID;
}

/* ---------------------------------------------
** M O D I F Y  C S S  O N  A N  A S S E T
** ---------------------------------------------
** Description:
** Modifies CSS on an asset
** Funtion accepts 2 argument:
**      1. 'cssContent' can be the css content to be added on asset
**      2. 'type' can be the page or template
*/
module.exports.ModifyCSSOnAsset = (cssContent, type) => {
    if(type === 'page'){
        act.ToggleAdditionalProperties();
    }
    act.ClickAddCSS(type);
    browser.pause(5000);
    act.EditCSS();
    act.AddCSSContent(cssContent);
    act.SaveCSS();
    cssChronID = act.GetCSSChronID(type);
    return cssChronID;
}


/* -------------------------------
** S W I T C H  A S S E T  T A B S 
** -------------------------------
** Description:
** Switch between tabs while editing the asset
** Function accepts tabName argument.
** tabName can be 'Page Layout', 'Preview', 'Template Layout', 'Properties' etc.,
*/
module.exports.SwitchAssetTabs = (tabName) => {
    props.SwitchAssetTabs(tabName);
}

/* ---------------------------------------------------------------------
** C H E C K - I N  O R  P U B L I S H ( from Save/Publish button-menu )
** ---------------------------------------------------------------------
** Description:
** Checkin or Publish the asset
** Function accepts 2 arguments:
**      1. 'action' can be 'Checkin' (or 'Save') or 'Publish to Staging' or 'Publish to Live'
**      2. 'comment' can be any user comment entered while saving/publishing the asset
*/
module.exports.SaveOrPublishTheAsset = (action, comment) => {
    act.SavePublish(action, comment);
}

/* -----------------------------------------------
** P U B L I S H ( from More Actions button-menu )
** -----------------------------------------------
** Description:
** Checkin or Publish the asset
** Function accepts 2 arguments:
**      1. 'action' can be 'Publish to Staging' or 'Publish to Live'
**      2. 'comment' can be any user comment entered while saving/publishing the asset
*/
module.exports.SaveOrPublishTheAssetFromMoreActions = (action, comment) => {
    act.SavePublishFromMoreActions(action, comment);
}

/* --------------------------------------------------------------------------------------
** G E T  A S S E T  V E R S I O N  A N D  S T A G E  F R O M  U S E R  I N T E R F A C E
** --------------------------------------------------------------------------------------
** Description:
** Returns the asset version (eg: 3.0) and stage (eg: staging)
** Function accepts 2 arguments:
**      1. 'assetName' can be 'selected' (if the asset is selected in Interior Workcenter or Search Results screen) 
**          or can be null if user is in asset readonly/edit mode.
**      2. 'from' can be 'Asset Screen' (if user is in asset readonly/edit mode) or null
*/
module.exports.GetAssetVersionAndStage = (assetName, from) => {
    let assetVS;
    switch (from) {
        case 'Asset Screen': assetVS = props.GetAssetVersionAndStage(); break;
        default: assetVS = iwc.GetVersionAndStageOfAsset(assetName); break;
    }
    return assetVS;
}

/* --------------------------------------------------
** P R O P A G A T E  T E M P L A T E  M O D U L E S
** --------------------------------------------------
** Description:
** Propagates the required templates modules
** Function accepts 1 arguments:
**      1. 'specs' is a json.
example for specs:
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

/* ----------------------------
** C A N C E L  C H E C K O U T
** ----------------------------
** Description:
** Cancles the checkout on the asset
*/
module.exports.CancelCheckout = () => {
    act.CancelCheckout();
}

/*

*/
module.exports.SelectNodeAction = ([actionName, publishNode, templateStatus, pageStatus]) => {
    act.SelectNodeAction([actionName, publishNode, templateStatus, pageStatus]);
}

/*----------------------------------------------------------------------------------------------------------- */
/**************************************** R E D I R E C T   T O O L *****************************************/
/*----------------------------------------------------------------------------------------------------------- */

/* ------------------------------------------------
** E N T E R  R E D I R E C T  T O O L  S C R E E N
** ------------------------------------------------
** Description:
** Enters Redirect Tool screen
*/
module.exports.NavigateToRedirectToolPage = () => {
    menu.SelectHamburgerMenuItem('Redirect Tool');
}

/* -------------------------------------
** S E A R C H  F O R  R E D I R E C T S
** -------------------------------------
** Description:
** Search for redirects based on the input parameters
**
** Function accepts 1 argument, which should strictly be a json:
** {
**    "from": "some url",
**    "to": "some url"
** }
*/
module.exports.SearchForRedirects = (params) => {
    rdt.Search(params);
}

/* ---------------------------------------------------------------------------
** E X P O R T  A L L  R E D I R E C T S  O F  A  S I T E  T O  C S V  F I L E
** ---------------------------------------------------------------------------
** Description:
** Clicks on "Export to Excel" button on the Redirects Search Reults screen to export all
** the search results present in the results grid to an excel file 
*/
module.exports.ExportRedirectsToCsvFileForSite = (site) => {
    rdt.ExportRedirects(site);
}

/* -----------------------------------------------
** I M P O R T  R E D I R E C T S
** -----------------------------------------------
** Description:
** Imports the excel file with redirects
**
** Function accepts 1 argument:
** 1. Path of file to import
*/
module.exports.ImportRedirects = function (path) {
    rdt.BulkImport();
    if(rdt.IsFile(path)){
        rdt.UploadRedirects(path);
        browser.element("//section/ul/li").waitForVisible();
    }
}

/* ---------------------------------------------------------------------------------
** E X P O R T  R E D I R E C T  S E A R C H  R E S U L T S  T O  E X C E L  F I L E
** ---------------------------------------------------------------------------------
** Description:
** Clicks on "Export to Excel" button on the Redirects Search Reults screen to export all
** the search results present in the results grid to an excel file 
*/
module.exports.ExportRedirectSearchResultsToExcelFile = () => {
    rdt.ExportRedirects('search results');
}

/* ------------------------------
** C R E A T E  R E D I R E C T S
** ------------------------------
** Description:
** Creates a Redirect based on the mentioned properties
** 
** Function accepts 1 argument:
**      1. 'props' - Values to be populated in the create redirects screen (in json format) 
*/
module.exports.ExportRedirectSearchResultsToExcelFile = () => {
    rdt.ExportRedirects('search results');
}

/* ------------------------------------------------
** V E R I F Y  W H E T H E R  F I L E  E X I S T S
** ------------------------------------------------
** Description:
** Verifies whether the specified file exists in the specified path, and returns true is the file exists and false is the file does not exist
**
** Function accepts 2 arguments:
**    1. filename - Name of the file whose existence is to be verified
**    2. path - Path of the file whose existence is to be verified
*/
module.exports.VerifyFileExistence = (filepath) => {
    let isPresent = null;
    browser.call(() => {
        rdt.VerifyFile(filepath).then(function (result) {
            isPresent = result;
        });
    });
    browser.waitUntil(function () {
        return isPresent == null ? false : true;
    }, 60000, 'Wait for file timeout reached. Please increase the timeout if necessary!', 500);

    return isPresent;
}

/* --------------------
** D E L E T E  F I L E
** --------------------
** Description:
** Deletes the specified file from the specified path (SHOULD BE USED ONLY TO REMOVE THE FILES DOWNLOADED WHILE TESTING 'EXPORT' FUNCTIONALITY)
**
** Function accepts 2 arguments:
**    1. filename - Name of the file whose existence is to be verified
**    2. path - Path of the file whose existence is to be verified
*/
module.exports.DeleteFile = (filepath) => {
    rdt.DeleteFile(filepath);
    let isPresent = null;
    browser.call(() => {
        rdt.VerifyFile(filepath).then(function (result) {
            isPresent = result;
        });
    });
    browser.waitUntil(function () {
        return isPresent == null ? false : true;
    }, 60000, 'Wait for file timeout reached. Please increase the timeout if necessary!', 500);

    return isPresent;
}

/* -----------------------------
** D E L E T E  A L L  F I L E S
** -----------------------------
** Description:
** Deletes the specified file from the specified path (SHOULD BE USED ONLY TO REMOVE THE FILES DOWNLOADED WHILE TESTING 'EXPORT' FUNCTIONALITY)
**
** Function accepts 2 arguments:
**    1. filename - Name of the file whose existence is to be verified
**    2. path - Path of the file whose existence is to be verified
*/
module.exports.DeleteAllFilesIn = (filepath, contains) => {

    let allFiles = rdt.ReadDirectory(filepath);

    if (contains == undefined) {
        if (allFiles.length > 0) {
            for (var i = 0; i < allFiles.length; i++) {
                let filePath = filepath + '\\' + allFiles[i];
                if (rdt.IsFile())
                    rdt.DeleteFile(filePath);
            }
        }
    }
    else {
        if (allFiles.length > 0) {
            for (var i = 0; i < allFiles.length; i++) {
                let filePath = filepath + '\\' + allFiles[i];
                if (rdt.IsFile(filePath) && allFiles[i].includes(contains))
                    rdt.DeleteFile(filePath);
            }
        }
    }
}


/*------------------------------------------------------------------------------------------------------------- */
/**************************************** A C T I V I T Y   Q U E U E *****************************************/
/*------------------------------------------------------------------------------------------------------------- */

/* -------------------------------------
** E N T E R  A C T I V I T Y  Q U E U E
** -------------------------------------
** Description:
** Enter the Activity Queue Status screen
*/
module.exports.EnterActivityQueueStatusPage = () => {
    menu.EnterActivityQueueStatusPage();
}

/* ------------------------------------------------------
** F I L T E R  A C T I V I T Y  Q U E U E  R E S U L T S
** ------------------------------------------------------
** Description:
** Filter the results in the activity queue
** Function accepts 1 argument:
**      1. 'filter' can be either 'Áll' or 'Completed' or 'Failed' or 'In Progress'
*/
module.exports.FilterResultsInQueue = (filter) => {
    queue.Show(filter);
}

/* -------------------------------------------------------------------------------
** F E T C H  L A T E S T  S T A T U S  O F  A N  A S S E T  I N  T H E  Q U E U E
** -------------------------------------------------------------------------------
** Description:
** Fecthes latest status of the required asset from the queue.
** The function returns a json
** Function accepts 1 argument:
**      1. 'chronID' - the Chronicle ID of the asset whose latest status is to be fetched
*/
module.exports.GetAssetDetailsFromQueue = (chronID) => {
    return queue.GetAssetDetailsFromQueue(chronID);
}

/* ---------------------------------------
** R E F R E S H  Q U E U E  R E S U L T S
** ---------------------------------------
** Description:
** Refresh the queue
*/
module.exports.RefreshTheQueue = () => {
    queue.RefreshTheQueue();
}

/* -----------------------------------
** T O G G L E  A U T O  R E F R E S H
** -----------------------------------
** Description:
** Enable or Disbale Auto-Refresh in the Activity Queue Screen
*/
module.exports.EnableDisableAutoRefresh = (action) => {
    queue.ClickAutoRefresh(action);
}

/*--------------------------------------------------------------------------------------------------------------------------- */
/**************************************** S O M E   U S E F U L   F U N C T I O N S *****************************************/
/*--------------------------------------------------------------------------------------------------------------------------- */

/* ----------------------------------
** G E T  S I T E  U N D E R  T E S T
** ----------------------------------
** Description:
** Returns the site being used for testing
*/
module.exports.GetCurrentSite = () => {
    return app.GetCurrentSite();
}

/* ---------------------------------------------------------------------
** G E T  C H R O N I C L E  I D  O F  T H E  S E L E C T E D  A S S E T
** ---------------------------------------------------------------------
** Description:
** Returns the Chronicle ID of the selected asset
**
** Function accepts 1 argument:
**  1. 'screen' can be 'IWC' (uses IWC even if null is mentioned) or 'Search Results'
*/
module.exports.GetChronIDOfTheSelectedAsset = (screen) => {
    return iwc.GetChronIDOfTheSelectedAsset(screen);
}

/* ----------------------
** S E L E C T  A S S E T
** ----------------------
** Description:
** Selects the required asset from the list
**
** Function accepts 1 argument:
**  1. 'assetName' is the name of the asset to be selected
*/
module.exports.SelectAsset = (assetName) => {
    iwc.SelectAsset(assetName);
}

/* --------------------------------------------
** N A V I G A T E  T O  T H E  H O M E P A G E
** --------------------------------------------
** Description:
** Navigates to the homepage
**
*/
module.exports.NavigateToHomepage = () => {
    menu.GoHome();
}

/* ------------------------------------------------------
** S E L E C T  M O R E  A C T I O N S  M E N U - I T E M
** ------------------------------------------------------
** Description:
** Select a More Actions menu-item. eg: Asset History
**
** Function accepts 1 argument:
**  1. 'menuItem' is the name of the option to be selected
**  2. 'argument' is the version to select to in the Asset History panel
*/
module.exports.SelectMoreActionsMenuItem = (menuItem, argument) => {
    act.SelectMoreActionsMenuItem(menuItem, argument);
}

/*

*/
module.exports.GetCurrentWindowsUsername = () => {

}

/*--------------------------------------------------------------------------------------------------------------------- */
/**************************************** A T S   S T A T U S   C H E C K E R *****************************************/
/*--------------------------------------------------------------------------------------------------------------------- */

/* ----------------------------------------------------------------
** N A V I G A T E  T O  A T S  S T A T U S  C H E C K E R  P A G E
** ----------------------------------------------------------------
** Description:
** Navigate to ATS Status Checker Page
**
** Function accepts 2 argument:
**  1. 'chronID' - chronicle id of the asset whose status is to be checked
**  2. 'stage' - 'preview', 'staging' or 'live'
*/
module.exports.NavigatetoATSStatusCheckerPageOf = (chronID, stage) => {
    return ats.Navigate(chronID, stage); //Returns the URL of the page which existed before navigating to the ATS Status Checker page
}

/* --------------------------------------------------------------------------
** C L I C K  A N Y  R E Q U I R E D  B U T T O N  I N  T H E  A T S  P A G E
** --------------------------------------------------------------------------
** Description:
** Used to choose various options available in the status checker page
**
** Function accepts 2 argument:
**  1. 'buttonText' - The button to be clicked
**          >> buttonText can be buttons or links
**              -- Buttons: Check, Redirect to URL, ATS Reprocess, Find Link Dependents
**              -- Links: Preview, Staging, Live, New, Reproces, Processing, Done, Unknown, Failed, Download, ATS Asset Info
*/
module.exports.ClickButtonInATSPage = (buttonText) => {
    ats.ClickOn(buttonText);
}

/* ------------------------------------------------------------------
** W A I T  F O R  A T S  X M L  F I L E  T O  B E  G E N E R A T E D
** ------------------------------------------------------------------
** Description:
** Wait until ATS Output File is genrated
**
** Function accepts 1 argument:
**  1. 'fileType' - 
*/
module.exports.WaitForATSFile = (fileType) => {
    ats.WaitFor(fileType);
}

/* -----------------------------
** G E T  X M L  D O C U M E N T
** -----------------------------
** Description:
** Obtains the XML Document from the specified URL or from the local file system
**
** Function accepts 3 argument:
**  1. 'chronId' - chronicle id of th asset whose xml is to be obtained
**  2. 'stage' - stage of the asset (preview or staging or live)
**  3. 'inputType' - can be 
**          -- 'FILE' - to obtain xml from the local file system OR
**          -- 'URL'- to obtain the xml from server
*/
module.exports.GetXML = (chronId, stage, inputType) => {
    var xmlUrl;
    if (inputType == 'FILE') {
        xmlUrl = chronId;
    }
    else
        switch (global.testEnv) {
            case 'qa02':
            case 'Qa02':
            case 'QA02':
                if (stage.toLowerCase() != 'live') {
                    xmlUrl = "http://ats." + stage + ".perf.webmd.com/ATSFile.aspx?ID=" + chronId;
                }
                else {
                    xmlUrl = "http://ats.perf.webmd.com/ATSFile.aspx?ID=" + chronId;
                }
                break;
            default:
                if (stage.toLowerCase() != 'live') {
                    xmlUrl = "http://ats." + stage + "." + global.testEnv + ".webmd.com/ATSFile.aspx?ID=" + chronId;
                }
                else {
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

/* --------------------------------------------
** N A V I G A T E  T O  R U N T I M E  P A G E
** --------------------------------------------
** Description:
** Navigates to the runtime page by clicking 'Redirect to URL'
*/
module.exports.NavigateToRuntimePage = function () {
    ats.ClickOn('Redirect to URL');
    var tabs = browser.windowHandles().value;
    browser.switchTab(tabs[1]);
    return tabs;
}

/* -------------------------------------------------------
** G E T  M O D U L E  P R O P E R T I E S  F R O M  X M L
** -------------------------------------------------------
** Description:
** Extracts the module properties from the XML and flattens the hierarchy to return a flat json
**
** Function accepts 2 argument:
**  1. 'assetType' - asset whose details are to be parsed fom the xml
**  2. 'xml' - xml of the asset
*/
//Extracts the values from the XML and flattens the hierarchy to return a flat json
module.exports.GetXMLValues = (assetType, xml) => {
    let moduledata;
    switch (assetType.toLowerCase()) {
        case 'multiple video launch module': moduledata = assetxml.MultipleVideoLaunchXMLValues(xml); break;
        case 'sponsor box module': moduledata = assetxml.SponsorModuleLaunchXMLValues(xml); break;
        case 'navigation module': moduledata = assetxml.NavigationModuleLaunchXMLValues(xml); break;
        case 'editorial module': moduledata = assetxml.ConfigureEditorialModule(xml); break;
        case 'vertical promo module': moduledata = assetxml.ConfigureVerticalPromoModule(xml); break;
        case 'editnavigation module': moduledata = assetxml.EditNavigationModuleLaunchXMLValues(xml); break;
        case 'html module': moduledata = assetxml.HTMlModuleXMLValues(xml); break;
    }
    return moduledata;
}

/*------------------------------------------------------------------------------------------------- */
/**************************************** D C T M   A P I *****************************************/
/*------------------------------------------------------------------------------------------------- */

/* ---------------------------------------
** G E N E R A T E  A C C E S S  T O K E N
** ---------------------------------------
** Description:
** Generate the access token
*/
module.exports.GenerateApiAccessToken = function () {
    var ticket;
    browser.call(() => {
        return pb2api.GenerateAccessToken().then((response) => {
            ticket = response.data.loginTicket;
        });
    });
    browser.waitUntil(function () {
        return ticket == undefined ? false : true;
    }, 60000, 'Generating access token is taking longer than expected! Please increase timeouts if necessary and try again!', 500)
    //console.log(ticket);
    return ticket;
}

/* ------------------------
** S A V E  E N D P O I N T
** -------------------------
** Description:
** Creates an asset using DCTM API
**
** Function accepts 3 arguments:
** 1. Type: Sync or Async (Default is Sync)
** 2. Ticket: Access Token for DCTM API
** 3. Payload
*/
module.exports.CreateAssetUsingApi = function (type, ticket, payload) {
    let asset;
    switch (type.toLowerCase()) {
        case 'async':
            asset = pb2api.GenerateAccessToken().then((response) => {
                var ticket = response.data.loginTicket;
                return pb2api.CreateAsset(ticket, payload).then((newAsset) => {
                    return newAsset;
                });

            });
            break;
        default:
            browser.call(() => {
                return pb2api.CreateAsset(ticket, payload).then((newAsset) => {
                    asset = newAsset;
                });
            });
            browser.waitUntil(function () {
                return asset == undefined ? false : true;
            }, 120000, 'Creating the asset is taking longer than expected! Please increase timeouts if necessary and try again!', 500);
            break;
    }
    return asset;
}

/* ------------------------
** S A V E  E N D P O I N T
** -------------------------
** Description:
** Checks-in an asset using DCTM API
**
** Function accepts 3 arguments:
** 1. Type: Sync or Async (Default is Sync)
** 2. Ticket: Access Token for DCTM API
** 3. Payload
*/
module.exports.CheckinAssetUsingApi = function (type, ticket, payload) {
    let response;
    switch (type.toLowerCase()) {
        case 'async':
            response = pb2api.GenerateAccessToken().then((response) => {
                var ticket = response.data.loginTicket;
                return pb2api.CreateAsset(ticket, payload).then((newAsset) => {
                    return newAsset;
                });

            });
            break;
        default:
            browser.call(() => {
                return pb2api.CreateAsset(ticket, payload).then((newAsset) => {
                    response = newAsset;
                });
            });
            browser.waitUntil(function () {
                return response == undefined ? false : true;
            }, 120000, 'Creating the asset is taking longer than expected! Please increase timeouts if necessary and try again!', 500);
            break;
    }
    return response;
}

/* ------------------------------
** P U B L I S H  E N D P O I N T
** ------------------------------
** Description:
** Publishes an asset using DCTM API
**
** Function accepts 2 arguments:
** 1. Ticket: Access Token for DCTM API
** 2. Payload
*/
module.exports.PublishAssetUsingApi = function (ticket, payload) {
    var response;
    browser.call(() => {
        return pb2api.PublishAssetUsingApi(ticket, payload).then((resp) => {
            response = resp;
        });
    });
    browser.waitUntil(function () {
        return response == undefined ? false : true;
    }, 120000, 'Publishing the asset is taking longer than expected! Please increase timeouts if necessary and try again!', 500);
    return response;
}

/* ----------------------------------
** C H E C K - O U T  E N D P O I N T
** ----------------------------------
** Description:
** Checks-out an asset using DCTM API
**
** Function accepts 2 arguments:
** 1. Ticket: Access Token for DCTM API
** 2. Payload
*/
module.exports.CheckoutAssetUsingApi = function (ticket, props) {
    var response;
    browser.call(() => {
        return pb2api.CheckoutAssetUsingApi(ticket, props).then((resp) => {
            response = resp;
        });
    });
    browser.waitUntil(function () {
        return response == undefined ? false : true;
    }, 120000, 'Checking-out the asset is taking longer than expected! Please increase timeouts if necessary and try again!', 500);
    return response;
}

/* -----------------------------------------------
** C A N C E L  C H E C K - O U T  E N D P O I N T
** -----------------------------------------------
** Description:
** Checks-out an asset using DCTM API
**
** Function accepts 2 arguments:
** 1. Ticket: Access Token for DCTM API
** 2. Payload
*/
module.exports.CancelCheckoutAssetUsingApi = function (ticket, payload) {
    var response;
    browser.call(() => {
        return pb2api.CancelCheckoutAssetUsingApi(ticket, payload).then((resp) => {
            response = resp;
        });
    });
    browser.waitUntil(function () {
        return response == undefined ? false : true;
    }, 120000, 'Cancel Checking-out the asset is taking longer than expected! Please increase timeouts if necessary and try again!', 500);
    return response;
}

/* --------------------------------------
** E X E C U T E  D Q L  E N D P O I N T
** --------------------------------------
** Description:
** Execute DQL using DCTM API
**
** Function accepts 2 arguments:
** 1. Ticket: Access Token for DCTM API
** 2. DQL - Query
*/
module.exports.ExecuteDQLUsingApi = function (ticket, dql) {
    var response;
    browser.call(() => {
        return pb2api.ExecuteDQLUsingApi(ticket, {dql: dql}).then((resp) => {
            response = resp;
        });
    });
    browser.waitUntil(function () {
        return response == undefined ? false : true;
    }, 120000, 'Executeing DQl and obtaing response from the server is taking longer than expected! Please increase timeouts if necessary and try again!', 500);
    return response;
}


module.exports.searchurl = function (ticket,payload) {
    var response;
    browser.call(() => {
        return pb2siemngmntapi.searchurl(ticket,payload).then((resp) => {
            response = resp;
        });
    });
    browser.waitUntil(function () {
        return response == undefined ? false : true;
    }, 120000, 'Executeing DQl and obtaing response from the server is taking longer than expected! Please increase timeouts if necessary and try again!', 500);
    return response;
}
module.exports.searchbaseurl = function (ticket,payload) {
    var response;
    browser.call(() => {
        return pb2siemngmntapi.searchbaseurl(ticket,payload).then((resp) => {
            response = resp;
        });
    });
    browser.waitUntil(function () {
        return response == undefined ? false : true;
    }, 120000, 'Executeing DQl and obtaing response from the server is taking longer than expected! Please increase timeouts if necessary and try again!', 500);
    return response;
}
/*--------------------------------------------------------------------------------------------------- */
/**************************************** D A T A B A S E S *****************************************/
/*--------------------------------------------------------------------------------------------------- */

