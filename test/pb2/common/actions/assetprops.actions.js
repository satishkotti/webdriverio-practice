var props = require('./../elements/assetprops.page');
var page = require('./../../../common/page');
var actions = require('./assetactions.actions');
var iwc = require('./iwc.actions');
var menu = require('./menus.actions');

module.exports.PopulatePageProps = (assetProps) =>
{
    switch (assetProps.type)
    {
        case 'inherited': props.checkbox.get('Inherit from Template').click(); props.dropdown('Inherit From Template', assetProps.inheritFrom); break;
        case 'standalone': props.checkbox.get('New Standalone').click(); props.dropdown('Layout', assetProps.layout); 
        if( assetProps.layoutCSS != null ) { props.dropdown('CSS Option', assetProps.layoutCSS); } break;
    }

    actions.ClickModalContinueButton();

    //Page Name
    props.input.get('Page Name').setValue(assetProps.pageName);

    if (assetProps.isCAP == 1) //CAP Page
    {
        props.checkbox.get('Is CAP?').click();
        props.dropdown('Content Filter', assetProps.contentFilter);
        if(assetProps.sponsorProgram != null ) { props.dropdown('Sponsor Program', assetProps.sponsorProgram) };
        if(assetProps.tier != 2) { props.dropdown('Tier', assetProps.tier) };
        if(assetProps.pageThumbnail != null ) { props.input.get('Page Thumbnail').setValue(assetProps.pageThumbnail) };
        if(assetProps.healthRefType != null ) { props.dropdown('Health Reference Type', assetProps.healthRefType) };

    }
    else if (assetProps.isDefault == 1) //Default Page
    {
        props.checkbox.get('Is Default').click();
        if(assetProps.channel != null ) { props.dropdown('Channel', assetProps.channel) };
        if(assetProps.programCollection != null ) { props.dropdown('Program Collection', assetProps.programCollection) };
        props.input.get('Link Title').setValue(assetProps.linkTitle);
        props.input.get('Window Title').setValue(assetProps.linkTitle);
        props.dropdown('Content Classification', assetProps.contentClassification);
        props.dropdown('Primary Topic ID', assetProps.primaryTopicID);
        if(assetProps.sponsorProgram != null ) { props.dropdown('Sponsor Program', assetProps.sponsorProgram) };
        props.textarea.get('Keyword(s)').setValue(assetProps.keywords);
        props.textarea.get('User Description').setValue(assetProps.userDesc);
        props.textarea.get('Meta Description').setValue(assetProps.metaDesc);
        if(assetProps.isGated != 0) { props.checkbox.get('Is Gated?').click(); }
        if(assetProps.sslRequired != 0) { props.checkbox.get('SSL Required?').click(); }
        if(assetProps.tier != 2) { props.dropdown('Tier', assetProps.tier) };
        if(assetProps.collectionCategory != null ) { props.input.dropdown('Collection Category', assetProps.collectionCategory) };
        if(assetProps.secondaryTopicID != null ) { props.input.dropdown('Secondary Topic ID', assetProps.secondaryTopicID) };
        if(assetProps.pageThumbnail != null ) { props.input.get('Page Thumbnail').setValue(assetProps.pageThumbnail) };
        if(assetProps.publication != null ) { props.input.dropdown('Publication', assetProps.publication) };
        if(assetProps.healthRefType != null ) { props.dropdown('Health Reference Type', assetProps.healthRefType) };
        if(assetProps.authRequired != 'No' || assetProps.authRequired != null) { props.dropdown('Authentication Required', assetProps.authRequired) };
        if(assetProps.webmdNickname != null ) { props.input.get('WebMD Nickname').setValue(assetProps.webmdNickname) };
        if(assetProps.internallySearchable != null || assetProps.internallySearchable != 0) { props.checkbox.get('Internally Searchable?').click(); }
        if(assetProps.externallySearchable != null || assetProps.externallySearchable != 0) { props.checkbox.get('Externally Searchable?').click(); }
    }
    else if (assetProps.useArticleProperties == 1) //Use Article Properties Page
    {
        props.input.get('Friendly Name').setValue(assetProps.friendlyName);
        if(assetProps.sponsorProgram != null ) { props.dropdown('Sponsor Program', assetProps.sponsorProgram) };
        if(assetProps.isGated != 0) { props.checkbox.get('Is Gated?').click(); }
        if(assetProps.sslRequired != 0) { props.checkbox.get('SSL Required?').click(); }
        if(assetProps.tier != 2) { props.dropdown('Tier', assetProps.tier) };
        if(assetProps.collectionCategory != null ) { props.input.dropdown('Collection Category', assetProps.collectionCategory) };
        if(assetProps.secondaryTopicID != null ) { props.input.dropdown('Secondary Topic ID', assetProps.secondaryTopicID) };
        if(assetProps.pageThumbnail != null ) { props.input.get('Page Thumbnail').setValue(assetProps.pageThumbnail) };
        if(assetProps.healthRefType != null ) { props.dropdown('Health Reference Type', assetProps.healthRefType) };
        if(assetProps.authRequired != 'No' || assetProps.authRequired != null) { props.dropdown('Authentication Required', assetProps.authRequired) };
        if(assetProps.webmdNickname != null ) { props.input.get('WebMD Nickname').setValue(assetProps.webmdNickname) };
        if(assetProps.internallySearchable != null || assetProps.internallySearchable != 0) { props.checkbox.get('Internally Searchable?').click(); }
        if(assetProps.externallySearchable != null || assetProps.externallySearchable != 0) { props.checkbox.get('Externally Searchable?').click(); }

    }
    else //Normal Page
    {
        props.input.get('Friendly Name').setValue(assetProps.friendlyName);
        if(assetProps.channel != null ) { props.dropdown('Channel', assetProps.channel) };
        if(assetProps.programCollection != null ) { props.dropdown('Program Collection', assetProps.programCollection) };
        props.input.get('Link Title').setValue(assetProps.linkTitle);
        props.input.get('Window Title').setValue(assetProps.linkTitle);
        props.dropdown('Content Classification', assetProps.contentClassification);
        props.dropdown('Primary Topic ID', assetProps.primaryTopicID);
        if(assetProps.sponsorProgram != null ) { props.dropdown('Sponsor Program', assetProps.sponsorProgram) };
        props.textarea.get('Keyword(s)').setValue(assetProps.keywords);
        props.textarea.get('User Description').setValue(assetProps.userDesc);
        props.textarea.get('Meta Description').setValue(assetProps.metaDesc);
        if(assetProps.isGated != 0) { props.checkbox.get('Is Gated?').click(); }
        if(assetProps.sslRequired != 0) { props.checkbox.get('SSL Required?').click(); }
        if(assetProps.tier != "tier2") { props.dropdown('Tier', assetProps.tier) };
        if(assetProps.collectionCategory != null ) { props.input.dropdown('Collection Category', assetProps.collectionCategory) };
        if(assetProps.secondaryTopicID != null ) { props.input.dropdown('Secondary Topic ID', assetProps.secondaryTopicID) };
        if(assetProps.pageThumbnail != null ) { props.input.get('Page Thumbnail').setValue(assetProps.pageThumbnail) };
        if(assetProps.publication != null ) { props.dropdown('Publication', assetProps.publication) };
        if(assetProps.healthRefType != null ) { props.dropdown('Health Reference Type', assetProps.healthRefType) };
        if(assetProps.authRequired != 'No') { props.dropdown('Authentication Required', assetProps.authRequired) };
        if(assetProps.webmdNickname != null ) { props.input.get('WebMD Nickname').setValue(assetProps.webmdNickname) };
        if(assetProps.internallySearchable != 1) { props.checkbox.get('Internally Searchable?').click(); }
        if(assetProps.externallySearchable != 1) { props.checkbox.get('Externally Searchable?').click(); }
    }

    actions.ClickContinueButton();
    browser.waitForVisible('//div[@name="ContentPane0"]');
    return browser.getText('.pb-chron');
}

module.exports.PopulateTemplateProps = (assetProps) =>
{
    browser.pause(25000); 

    switch (assetProps.type)
    {
        case 'inherited': props.checkbox.get('Inherit from Template').click(); props.dropdown('Inherit From Template', assetProps.inheritFrom); break;
        case 'standalone': props.checkbox.get('New Standalone').click(); browser.pause(2000); props.dropdown('Layout', assetProps.layout); 
        if( assetProps.layoutCSS != null ) { browser.pause(2000); props.dropdown('CSS Option', assetProps.layoutCSS); } break;
    }

    actions.ClickModalContinueButton();

    props.input.get('Template Name ').setValue(assetProps.templateName);
    props.input.get('Description').setValue(assetProps.description);
    if(assetProps.sponsorProgram != null ) { props.dropdown('Sponsor Program', assetProps.sponsorProgram) };
    if(assetProps.webmdNickname != null ) { props.input.get('WebMD Nickname').setValue(assetProps.webmdNickname) };
    if(assetProps.tier != 2) { props.dropdown('Tier', assetProps.tier) };
    if(assetProps.isGated != 0) { props.checkbox.get('Is Gated?').click(); }

    actions.ClickContinueButton();
    browser.waitForVisible('//div[@name="ContentPane0"]');
    return browser.getText('.pb-chron');

}

module.exports.PopulateSMProps = (assetProps) =>
{
    menu.SelectCreateMenuItem('Shared Modules');
    props.input.get('Module Name').setValue(assetProps.moduleName);
    if ( assetProps.moduleName != null || assetProps.moduleName != '' ) { props.input.get('Module Display Name').setValue(assetProps.moduleDispName) };
    props.dropdown('Module Type', assetProps.moduleType);
    if ( assetProps.category != null ) { props.dropdown('Category', assetProps.category); }
    if ( assetProps.selectXSL != null ) { props.dropdown('Select XSL', assetProps.selectXSL); }
    if ( assetProps.selectCSS != null ) { props.dropdown('Select CSS', assetProps.selectCSS); }
    if ( assetProps.dynamicModuleCategory != null ) { props.dropdown('Dynamic Module Category', assetProps.dynamicModuleCategory); }
    if ( assetProps.moduleLabel1 != null ) { props.dropdown('Module Label 1', assetProps.moduleLabel1); }
    if ( assetProps.moduleLabel2 != null ) { props.dropdown('Module Label 2', assetProps.moduleLabel2); }
    if ( assetProps.linkedModule != null ) { props.input.get('Linked Module').setValue(assetProps.linkedModule); }
    if ( assetProps.description != null ) { props.textarea.get('Description').setValue(assetProps.description); }
    if(assetProps.sponsorProgram != null ) { props.dropdown('Sponsor Program', assetProps.sponsorProgram) };
    if(assetProps.tier != 2) { props.dropdown('Tier', assetProps.tier) };
    actions.ClickContinueButton();
    actions.ClickContinueButton();
    browser.waitForVisible('.pb-chron');
    return browser.getText('.pb-chron');
}

module.exports.AddModule = (contentPane, assetProps) =>
{

    props.element('div[name="' + contentPane + '"').moveToObject();
    props.element('div[name="' + contentPane + '"] .fa-plus.add-module').click();
    props.element('.pb-add-module.section-open').waitForVisible();
    props.input.get('Module Name').setValue(assetProps.moduleName);
    if ( assetProps.moduleName != null || assetProps.moduleName != '' ) { props.input.get('Module Display Name').setValue(assetProps.moduleDispName) };
    props.dropdown('Module Type', assetProps.moduleType);
    if ( assetProps.dynamicModuleCategory != null ) { props.dropdown('Dynamic Module Category', assetProps.dynamicModuleCategory); }
    if ( assetProps.selectXSL != null ) { props.dropdown('Select XSL', assetProps.selectXSL); }
    if ( assetProps.selectCSS != null ) { props.dropdown('Select CSS', assetProps.selectCSS); }
    if ( assetProps.moduleLabel1 != null ) { props.dropdown('Module Label 1', assetProps.moduleLabel1); }
    if ( assetProps.moduleLabel2 != null ) { props.dropdown('Module Label 2', assetProps.moduleLabel2); }
    actions.ClickAddModuleButton();
    browser.waitUntil( () => {
        return browser.isExisting('//div[contains(@class,"tab-pane") and contains(@class,"active")]//i[contains(@class,"fa-pulse")]') == true;
    }, 30000, "Module is not yet added to the content pane", 500);
    browser.waitUntil( () => {
        return browser.isExisting('//div[contains(@class,"tab-pane") and contains(@class,"active")]//i[contains(@class,"fa-pulse")]') == false;
    }, 30000, "Module is not yet added to the content pane", 500);
    props.element('.pb-node-breadcrumb a').waitForVisible();
    props.element('.pb-layout-view').waitForVisible();
    browser.pause(20000);

}