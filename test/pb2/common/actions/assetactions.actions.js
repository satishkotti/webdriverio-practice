var acts = require('./../elements/actions.page');
var page = require('./../elements/assetprops.page');

module.exports.SelectMoreActions = (action) => 
{
    acts.button.get('More Actions').click();
    browser.pause(10000);
}

module.exports.ClickContinueButton = () =>
{
    acts.button.get('Continue').click();
}

module.exports.ClickModalOkayButton = () =>
{
    acts.button.get('Okay').click();
}

module.exports.ClickModalContinueButton = () =>

{
    acts.splbutton.get('Continue').click();
}

module.exports.ClickAddModuleButton = () =>
{
    acts.splbutton.get('Add Module').click();
}

module.exports.ClickShowEmptyContentPanes = () =>
{

    acts.splbutton.get(' Show').click();
}

module.exports.ClickShowExpired = () =>
{

    acts.splbutton.get('Expired').click();
}

module.exports.SavePublish = (action, comment) =>
{
    switch(action)
    {
        case 'Publish to Staging': 
            acts.buttonMenu.get('Save/Publish', 'Publish to Staging');
            page.textarea.get('Enter a comment below to publish to staging').waitForVisible();
            page.textarea.get('Enter a comment below to publish to staging').setValue(comment);
            acts.button.get('Okay').click();
            browser.waitUntil( () => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '106px';
            }, 30000, 'Publish is taking longer than expected', 500);
            browser.waitUntil( () => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '-20px';
            }, 30000, 'Publish is taking longer than expected', 500);
            acts.button.get('More Actions').waitForVisible();
            page.element('(//section[contains(@class, "pb-module-bottom-pad")])[2]').waitForVisible();
            break;
        case 'Publish to Live':
            acts.buttonMenu.get('Save/Publish', 'Publish to Live');
            page.textarea.get('Enter a comment below to publish to live').waitForVisible();
            page.textarea.get('Enter a comment below to publish to live').setValue(comment);
            acts.button.get('Okay').click();
            browser.waitUntil( () => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '106px';
            }, 30000, 'Publish is taking longer than expected', 500);
            browser.waitUntil( () => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '-20px';
            }, 30000, 'Publish is taking longer than expected', 500);
            acts.button.get('More Actions').waitForVisible();
            page.element('(//section[contains(@class, "pb-module-bottom-pad")])[2]').waitForVisible();
            break;
        case 'Schedule Publish':
            acts.buttonMenu.get('Save/Publish', 'Publish to Live');
            page.textarea.get('Enter a comment below to publish to live').waitForVisible();
            page.textarea.get('Enter a comment below to publish to live').setValue(comment);         
            $('//input[@id="schedPub"]').click();  
            var datetime=browser.execute(function() {return $('input#pubDateTime').get(0).value}).value           
            var splitDate = datetime.split(' ');
            var time=splitDate[1].split(':');
            var minutues=parseInt(time[1])+2;
            minutues=minutues > 9 ? "" + minutues: "0" + minutues;
            var futureDate=splitDate[0]+' '+time[0]+':'+minutues+' '+splitDate[2];            
            browser.execute(function(date) {  $('input#pubDateTime').get(0).value=date; }, futureDate);      
            acts.button.get('Okay').click();
            browser.waitUntil( () => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '106px';
            }, 30000, 'Checkin is taking longer than expected', 500);
            browser.waitUntil( () => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '-20px';
            }, 30000, 'Checkin is taking longer than expected', 500);
            acts.button.get('More Actions').waitForVisible();
            page.element('(//section[contains(@class, "pb-module-bottom-pad")])[2]').waitForVisible();
            break;       
        default:
            acts.buttonMenu.get('Save/Publish', 'Checkin');
            page.textarea.get('Enter a comment below to checkin asset').waitForVisible();
            page.textarea.get('Enter a comment below to checkin asset').setValue(comment);
            acts.button.get('Okay').click();
            browser.waitUntil( () => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '106px';
            }, 30000, 'Checkin is taking longer than expected', 500);
            browser.waitUntil( () => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '-20px';
            }, 30000, 'Checkin is taking longer than expected', 500);
            acts.button.get('More Actions').waitForVisible();
            page.element('(//section[contains(@class, "pb-module-bottom-pad")])[2]').waitForVisible();
            break;
    }
}

module.exports.ClickEditButton = () =>
{
    acts.button.get('Edit').click();
    acts.splbutton.get('Save/Publish').waitForVisible();
    page.element('(//section[contains(@class, "pb-module-bottom-pad")])[2]').waitForVisible();
}

module.exports.ClickCheckoutAndEditButton = () =>
{
    acts.splbutton.get('Checkout & Edit').click();
    acts.splbutton.get('Save/Publish').waitForVisible();
    page.element('.pb-layout-view').waitForVisible();
    browser.pause(3000);
}

module.exports.SavePublishFromMoreActions = (action, comment) =>
{
    switch(action)
    {
        case 'Publish to Staging': 
            acts.buttonMenu.get('More Actions', 'Publish');
            $('//input[@value="staging"]').waitForVisible();
            $('//input[@value="staging"]').click();           
            acts.button.get('Publish').click();   
            browser.waitUntil( () => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '106px';
            }, 30000, 'Publish is taking longer than expected', 500);
            browser.waitUntil( () => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '-20px';
            }, 30000, 'Publish is taking longer than expected', 500);
            break;
        case 'Publish to Live':
           acts.buttonMenu.get('More Actions', 'Publish');
           $('//input[@value="live"]').waitForVisible();
           $('//input[@value="live"]').click();  
           acts.button.get('Publish').click();        
           browser.waitUntil( () => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '106px';
            }, 30000, 'Publish is taking longer than expected', 500);
            browser.waitUntil( () => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '-20px';
            }, 30000, 'Publish is taking longer than expected', 500);
            break;           
        
    }
}

module.exports.SelectMoreActionsMenuItem = (menuItem) =>
{
    acts.buttonMenu.get('More Actions', menuItem);

    switch(menuItem)
    {
        case 'Cancel Checkout':
        var ele = acts.button.get('Okay');
        ele.waitForVisible();
        ele.click();
        browser.waitUntil( () => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '106px';
            }, 30000, 'Cancel Checkout is not pushed to queue yet', 500);
            browser.waitUntil( () => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '-20px';
            }, 30000, 'Cancel Checkout is not pushed to queue yet', 500);
            break; 

        case 'Expire':
        browser.waitForVisible('#modal-ok');
        browser.click('#modal-ok');
        browser.waitUntil( () => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '106px';
            }, 30000, 'Expire is not pushed to queue yet', 500);
            browser.waitUntil( () => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '-20px';
            }, 30000, 'Expire is not pushed to queue yet', 500);
            break; 
    }
}



