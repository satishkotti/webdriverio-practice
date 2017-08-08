var acts = require('./../elements/actions.page');
var page = require('./../elements/assetprops.page');

var cssChronIDPage = "//form[@label= 'Page CSS']/label/a";
var cssChronIDTemplate = "//form[@label= 'Template CSS']/label/a"
var csstextarea = "//*[@class = 'pb-modal-content pb-grid-fixed']//textarea";
var sslconfig = "//label[contains(., 'SSL Required?')]/input";

module.exports.GetSSLConfig = () => {
    return browser.element(sslconfig).isSelected();
}

module.exports.SetSSLConfig = (value) => {
    if(value){
        if(browser.element(sslconfig).isSelected())
            return;
        else{
            browser.element(sslconfig).click();
        }
    }
    else{
        if(browser.element(sslconfig).isSelected()){
            browser.element(sslconfig).click();
        }
        else
            return;
        }
    }

module.exports.ToggleAdditionalProperties = () => {
    if(page.link.get('Additional Properties').isVisible())
        page.link.get('Additional Properties').click();
}

module.exports.EditCSS = () => {
    browser.element("//button[string() = 'Edit']").click();
    browser.pause(7000);
}
module.exports.ClickAddCSS = (type) => {
    if (type === 'page')
        browser.element(cssChronIDPage).click();
    else
        browser.element(cssChronIDTemplate).click();
    browser.pause(7000);
}

module.exports.AddCSSContent = (cssContent) => {
    browser.element(csstextarea).setValue(cssContent);
    browser.pause(7000);
}

module.exports.SaveCSS = () => {
    acts.button.get('Save').click();
    browser.pause(10000);
}

module.exports.GetCSSChronID = (type) => {
    if (type === 'page')
        return browser.element(cssChronIDPage).getText();
    else
        return browser.element(cssChronIDTemplate).getText();
}

module.exports.SelectMoreActions = (action) => {
    acts.button.get('More Actions').click();
    browser.pause(10000);
}

module.exports.ClickContinueButton = () => {
    acts.button.get('Continue').click();
}

module.exports.ClickModalOkayButton = () => {
    acts.button.get('Okay').click();
}

module.exports.ClickModalContinueButton = () => {
    acts.splbutton.get('Continue').click();
}

module.exports.ClickAddModuleButton = () => {
    acts.splbutton.get('Add Module').click();
}

module.exports.ClickShowEmptyContentPanes = () => {

    acts.splbutton.get(' Show').click();
}

module.exports.ClickShowExpired = () => {
    acts.splbutton.get('Expired').click();
}

module.exports.ClickSaveButton = () => {
    acts.button.get('Save').click();
}

module.exports.SavePublish = (action, comment) => {
    switch (action.toLowerCase()) {
        case 'publish to staging':
            acts.buttonMenu.get('Save/Publish', 'Publish to Staging');
            page.textarea.get('Enter a comment below to publish to staging').waitForVisible();
            page.textarea.get('Enter a comment below to publish to staging').setValue(comment);
            acts.button.get('Okay').click();
            browser.waitUntil(() => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '106px';
            }, 30000, 'Publish is taking longer than expected', 500);
            browser.waitUntil(() => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '-20px';
            }, 30000, 'Publish is taking longer than expected', 500);
            acts.button.get('More Actions').waitForVisible();
            page.element('(//section[contains(@class, "pb-module-bottom-pad")])[2]').waitForVisible();
            break;
        case 'publish to live':
            acts.buttonMenu.get('Save/Publish', 'Publish to Live');
            page.textarea.get('Enter a comment below to publish to live').waitForVisible();
            page.textarea.get('Enter a comment below to publish to live').setValue(comment);
            acts.button.get('Okay').click();
            browser.waitUntil(() => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '106px';
            }, 40000, 'Publish is taking longer than expected', 500);
            browser.waitUntil(() => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '-20px';
            }, 30000, 'Publish is taking longer than expected', 500);
            acts.button.get('More Actions').waitForVisible();
           // page.element('(//section[contains(@class, "pb-module-bottom-pad")])[2]').waitForVisible();
            break;
        case 'schedule publish':
            acts.buttonMenu.get('Save/Publish', 'Publish to Live');
            page.textarea.get('Enter a comment below to publish to live').waitForVisible();
            page.textarea.get('Enter a comment below to publish to live').setValue(comment);
            $('//input[@id="schedPub"]').click();
            var datetime = browser.execute(function () { return $('input#pubDateTime').get(0).value }).value
            var splitDate = datetime.split(' ');
            var time = splitDate[1].split(':');
            var minutues = parseInt(time[1]) + 2;
            minutues = minutues > 9 ? "" + minutues : "0" + minutues;
            var futureDate = splitDate[0] + ' ' + time[0] + ':' + minutues + ' ' + splitDate[2];
            browser.execute(function (date) { $('input#pubDateTime').get(0).value = date; }, futureDate);
            acts.button.get('Okay').click();
            browser.waitUntil(() => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '106px';
            }, 30000, 'Checkin is taking longer than expected', 500);
            browser.waitUntil(() => {
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
            browser.waitUntil(() => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '106px';
            }, 30000, 'Checkin is taking longer than expected', 500);
            browser.waitUntil(() => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '-20px';
            }, 30000, 'Checkin is taking longer than expected', 500);
            acts.button.get('More Actions').waitForVisible();
            page.element('(//section[contains(@class, "pb-module-bottom-pad")])[2]').waitForVisible();
            break;
    }
}

module.exports.ClickEditButton = () => {
    acts.button.get('Edit').click();
    acts.splbutton.get('Save/Publish').waitForVisible();
    page.element('div.tab-pane.active').waitForVisible();
    browser.pause(3000);
}

module.exports.ClickCheckoutAndEditButton = () => {
    acts.splbutton.get('Checkout & Edit').click();
    acts.splbutton.get('Save/Publish').waitForVisible();
   // page.element('.pb-layout-view').waitForVisible();
    browser.pause(4000);
}

module.exports.SavePublishFromMoreActions = (action, comment) => {
    switch (action) {
        case 'Publish to Staging':
            acts.buttonMenu.get('More Actions', 'Publish');
            $('//input[@value="staging"]').waitForVisible();
            $('//input[@value="staging"]').click();
            acts.button.get('Publish').click();
            browser.waitUntil(() => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '106px';
            }, 30000, 'Publish is taking longer than expected', 500);
            browser.waitUntil(() => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '-20px';
            }, 30000, 'Publish is taking longer than expected', 500);
            break;
        case 'Publish to Live':
            acts.buttonMenu.get('More Actions', 'Publish');
            $('//input[@value="live"]').waitForVisible();
            $('//input[@value="live"]').click();
            acts.button.get('Publish').click();
            browser.waitUntil(() => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '106px';
            }, 30000, 'Publish is taking longer than expected', 500);
            browser.waitUntil(() => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '-20px';
            }, 30000, 'Publish is taking longer than expected', 500);
            break;

    }
}

module.exports.SelectMoreActionsMenuItem = (menuItem) => {
    acts.buttonMenu.get('More Actions', menuItem);

    switch (menuItem) {
        case 'Cancel Checkout':
            var ele = acts.button.get('Okay');
            ele.waitForVisible();
            ele.click();
            browser.waitUntil(() => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '106px';
            }, 30000, 'Cancel Checkout is not pushed to queue yet', 500);
            browser.waitUntil(() => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '-20px';
            }, 30000, 'Cancel Checkout is not pushed to queue yet', 500);
            break;

        case 'Expire':
            browser.waitForVisible('#modal-ok');
            browser.click('#modal-ok');
            browser.waitUntil(() => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '106px';
            }, 30000, 'Expire is not pushed to queue yet', 500);
            browser.waitUntil(() => {
                return browser.getCssProperty('.pb-notification-container', 'top').value == '-20px';
            }, 30000, 'Expire is not pushed to queue yet', 500);
            break;
        case 'Asset History':
            browser.waitForVisible('(//tr[contains(@class, "k-alt ng-scope")])[1]');
            browser.click('(//tr[contains(@class, "k-alt ng-scope")])[1]');
            break;
    }
}

module.exports.CancelCheckout = () => {
    acts.button.get('Cancel Checkout').click();
    var ele = acts.button.get('Okay');
    ele.waitForVisible();
    ele.click();
    browser.waitUntil(() => {
        return browser.getCssProperty('.pb-notification-container', 'top').value == '106px';
    }, 30000, 'Cancel Checkout did not happen yet', 500);
    browser.waitUntil(() => {
        return browser.getCssProperty('.pb-notification-container', 'top').value == '-20px';
    }, 30000, 'Cancel Checkout did not happen yet', 500);
}
module.exports.SelectNodeAction = ([actionName, publishNode, templateStatus, pageStatus]) => {
    acts.buttonMenu.get('Node Actions', actionName);
    switch (actionName) {
        case 'Publish Node':
            browser.waitForVisible('//span[text()="' + publishNode + '"]//parent::span//preceding-sibling::span//input');
            var node = $('//span[text()="' + publishNode + '"]//parent::span//preceding-sibling::span//input');
            node.click();
            if (templateStatus == 'Live' && pageStatus == 'Live') {
                $('//span[@class="pb-lifecycle active" and text()="Live"]//parent::span[text()="Template"]//parent::div//preceding-sibling::input').click();
            }
            else if (templateStatus == 'Live' && pageStatus == 'Staging') {
                $('(//span[@class="pb-lifecycle active" and text()="Live"]//parent::span[text()="Templates"]//parent::div//preceding-sibling::input)[1]').click();
            }
            else {
                $('(//span[@class="pb-lifecycle active" and text()="Live"]//parent::span[text()="Templates"]//parent::div//preceding-sibling::input)[2]').click();
            }
            $('//button[contains(.,"Publish")]').click();
            break;
    }
}
