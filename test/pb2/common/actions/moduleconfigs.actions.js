var props = require('./../elements/assetprops.page');
var act = require('./../elements/actions.page');
var page = require('./../../../common/page');
var actions = require('./assetactions.actions');
var iwc = require('./iwc.actions');
var menu = require('./menus.actions');


module.exports.Configuremultiplevideolunchmodule = (assetconfigProps) =>
{
    props.element('.fa-eye').click();
    props.element('div[name="' + contentPane + '"').waitForVisible();
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

     if ( assetProps.brand != "None" ){ props.dropdown('Brand', assetProps.brand); }
     if ( assetProps.moduleTitle != null ) { props.input.get('Module Title').setValue(assetProps.moduleTitle); }
     if ( assetProps.moduleDesc != null ) { props.input.get('Module Description').setValue(assetProps.moduleDesc); }
     if(assetProps.AddLinks > "1")
     {
        //for more than one link.
     }
     else
     {
     if ( assetProps.videoObject != null ) { props.input.get('Video Object').setValue(assetProps.videoObject); }
     if ( assetProps.videoTitleOverride != null ) { props.input.get(' Video Title Override').setValue(assetProps.videoTitleOverride); }
     if ( assetProps.videoDescOverride != null ) { props.input.get('Video Description Override').setValue(assetProps.videoDescOverride); }
     }
    

}