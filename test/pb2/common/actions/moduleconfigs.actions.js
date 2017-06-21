var props = require('./../elements/assetprops.page');
var act = require('./../elements/actions.page');
var page = require('./../../../common/page');
var actions = require('./assetactions.actions');
var iwc = require('./iwc.actions');
var menu = require('./menus.actions');

var legend = '';
var labelName = '';
var item = 1;
var locator = '//fieldset[legend[string()="' + legend + '"]]//label[contains(.,"Link:")]//input'


module.exports.ConfigureMultipleVideoLaunchModule = (assetProps) => {

    if (assetProps.brand != "None") { props.dropdown('Brand', assetProps.brand); }
    if (assetProps.moduleTitle != null) { props.input.get('Module Title').setValue(assetProps.moduleTitle); }
    if (assetProps.moduleDesc != null) { props.input.get('Module Description').setValue(assetProps.moduleDesc); }
    if (assetProps.AddLinks > "1") {
        //for more than one link.
    }
    else {
        if (assetProps.videos[0].videoObject != null) { props.lookup('Video Object', assetProps.videos[0].videoObject); }
        if (assetProps.videos[0].videoTitleOverride != null) { props.input.get('Video Title Override').setValue(assetProps.videos[0].videoTitleOverride); }
        if (assetProps.videos[0].videoDescOverride != null) { props.input.get('Video Description Override').setValue(assetProps.videos[0].videoDescOverride); }
    }
}

module.exports.ConfigureSponsorBoxModule = (assetProps) => {
    if (assetProps.logo != null) { props.lookup2('Sponsor Logo', 'Logo', 1, assetProps.logo); }
    if (assetProps.overridetext != null) { props.input2.get('Sponsor Logo', 'Override Text', 1).setValue(assetProps.overridetext); }
    if (assetProps.link != null) { props.lookup2('Sponsor Logo', 'Link', 1, assetProps.link); }
    if (assetProps.headertext != null) { props.input2.get('Header', 'Header Text', 1).setValue(assetProps.headertext); }
    if (assetProps.headerlink != null) { props.lookup2('Header', 'Link', 1, assetProps.headerlink); }

    if (assetProps.bodycopy.length > 1) {
        //for more than one link.
    }
    else {
        if (assetProps.bodycopy[0].bodycopyheadertext != null) { props.input2.get('Body Copy', 'Header Text', 1).setValue(assetProps.bodycopy[0].headertext); }
        if (assetProps.bodycopy[0].bodycopylink != null) { props.lookup2('Body Copy', 'Link', 1, assetProps.bodycopy[0].link); }
    }


    if (assetProps.bodyimagelogo != null) { props.lookup2('Body Image', 'Logo', 1, assetProps.bodyimagelogo); }
    if (assetProps.bodyimageoverridetext != null) { props.input2.get('Body Image', 'Override text', 1).setValue(assetProps.bodyimageoverridetext); }
    if (assetProps.bodyimageLink != null) { props.lookup2('Body Image', 'Link', 1, assetProps.bodyimageLink); }
    if (assetProps.bodyimageleft != 0) { props.checkbox2.get('Body Image', 'Left', 1).click(); }
    if (assetProps.bodyimageright != 0) { props.checkbox2.get('Body Image', 'Right', 1).click(); }

    if (assetProps.bodylinks.length > 1) {
        //for more than one link.
    }
    else {
        if (assetProps.bodylinks[0].bulletson != 0) { props.checkbox2.get('Body Links', 'Bullets On', 1).click(); }
        if (assetProps.bodylinks[0].text != null) { props.input2.get('Body Links', 'Text', 1).setValue(assetProps.bodylinks[0].text); }
        if (assetProps.bodylinks[0].link != null) { props.lookup2('Body Links', 'Link', 1, assetProps.bodylinks[0].link); }
    }

    if (assetProps.lowerlinks.length > 1) {
        //for more than one link.
    }
    else {
        if (assetProps.lowerlinks[0].bulletson != 0) { props.checkbox2.get('Lower Links', 'Bullets On', 1).click(); }
        if (assetProps.lowerlinks[0].newpage != 0) { props.checkbox2.get('Lower Links', 'New Page', 1).click(); }
        if (assetProps.lowerlinks[0].rollover != 0) { props.checkbox2.get('Lower Links', 'Rollover', 1).click(); }
        if (assetProps.lowerlinks[0].text != null) { props.input2.get('Lower Links', 'Text', 1).setValue(assetProps.lowerlinks[0].text); }
        if (assetProps.lowerlinks[0].link != null) { props.lookup2('Lower Links', 'Link', 1, assetProps.lowerlinks[0].link); }
    }
    if (assetProps.importcontent != null) { props.lookup2('Article', 'Import Content', 1, assetProps.importcontent); }
}

module.exports.ConfigureNavigationModule = (assetProps) => {
    if (assetProps.text != null) { props.input.get('Text').setValue(assetProps.text); }

    if (assetProps.addslides > "2") {

    }
    else {
        props.element('(//span[contains(@class,"pb-accordian-toggle")])[1]').click();
        if (assetProps.groupheadersection[0].groups[0].grouptext != null) { props.input2.get('Group Header Section', 'Text', 1).setValue(assetProps.groupheadersection[0].groups[0].grouptext); }
        if (assetProps.groupheadersection[0].groups[0].grouplink != null) { props.lookup2('Group Header Section', 'Link', 1, assetProps.groupheadersection[0].groups[0].grouplink); }
        if (assetProps.groupheadersection[0].groups[0].groupitemlinks[0].grouplinkitemtext != null) { props.input2.get('Group Link Items', 'Text', 1).setValue(assetProps.groupheadersection[0].groups[0].groupitemlinks[0].grouplinkitemtext); }
        if (assetProps.groupheadersection[0].groups[0].groupitemlinks[0].grouplinkitemlink != null) { props.lookup2('Group Link Items', 'Link', 1, assetProps.groupheadersection[0].groups[0].groupitemlinks[0].grouplinkitemlink); }
        props.element('(//span[contains(@class,"pb-accordian-toggle")])[2]').click();
        if (assetProps.groupheadersection[0].groups[1].grouptext != null) { props.input2.get('Group Header Section', 'Text', 3).setValue(assetProps.groupheadersection[0].groups[1].grouptext); }
        if (assetProps.groupheadersection[0].groups[1].grouplink != null) { props.lookup2('Group Header Section', 'Link', 3, assetProps.groupheadersection[0].groups[1].grouplink); }
        if (assetProps.groupheadersection[0].groups[1].groupitemlinks[0].grouplinkitemtext != null) { props.input2.get('Group Link Items', 'Text', 2).setValue(assetProps.groupheadersection[0].groups[1].groupitemlinks[0].grouplinkitemtext); }
        if (assetProps.groupheadersection[0].groups[1].groupitemlinks[0].grouplinkitemlink != null) { props.lookup2('Group Link Items', 'Link', 2, assetProps.groupheadersection[0].groups[1].groupitemlinks[0].grouplinkitemlink); }
    }


}

module.exports.ConfigureEditorialModule = (assetProps) => {
    if (assetProps.moduletitle != null) { props.input.get('Module Title').setValue(assetProps.moduletitle); }
    if (assetProps.link != null) { props.lookup('Link', assetProps.link); }

    if (assetProps.modulelinks.length > 1) {
        //for more than one link.
    }
    else {
        if (assetProps.modulelinks[0].modulelinksimage != null) { props.lookup('Image', assetProps.modulelinksimage); }
        if (assetProps.modulelinks[0].modulelinkslinktext != null) { props.input.get('Link Text').setValue(assetProps.modulelinkslinktext); }
        if (assetProps.modulelinks[0].modulelinkslink != null) { props.lookup2('Module Links', 'Link', 1, assetProps.modulelinks[0].modulelinkslink); }
        if (assetProps.modulelinks[0].modulelinksactiontext != null) { props.input.get('Action Text').setValue(assetProps.modulelinksactiontext); }

    }
    if (assetProps.descriptions.length > 1) {
        //for more than one link.
    }
    else {
        if (assetProps.description != null) { props.input.get('Description').setValue(assetProps.description); }
    }

    if (assetProps.linkedimages.length > 1) {
        //for more than one link.
    }
    else {
        if (assetProps.linkedimages[0].linkedimagesimage != null) { props.lookup2('Linked Images', 'Image', 1, assetProps.linkedimages[0].linkedimagesimage); }
        if (assetProps.linkedimages[0].linkedimageslink != null) { props.lookup2('Linked Images', 'Link', 1, assetProps.linkedimages[0].linkedimageslink); }
    }

    if (assetProps.importarticlecontent != null) { props.input.get('Import Article Content').setValue(assetProps.importarticlecontent); }
}

module.exports.ConfigureVerticalPromoModule = (assetProps) => {

    if (assetProps.image != null) { props.lookup('Image', assetProps.image); }
    if (assetProps.introtext != null) { props.input.get('Intro Text').setValue(assetProps.introtext); }
    if (assetProps.buttonlink != null) { props.lookup('Button Link', assetProps.buttonlink); }
    if (assetProps.buttontext != null) { props.input.get('Button Text').setValue(assetProps.buttontext); }

    if (assetProps.descriptiontext != null) { props.input.get('Description Text').setValue(assetProps.descriptiontext); }

    if (assetProps.iconicoverlays.length > 1) {
        //for more than one link.
    }
    else {
        try {
            props.element('(//span[contains(@class,"pb-accordian-toggle")])[1]').click();
        }
        catch (err) {
            props.element('(//span[contains(@class,"pb-accordian-toggle")])[1]').scroll(0, 500);
            props.element('(//span[contains(@class,"pb-accordian-toggle")])[1]').click();
        }
        if (assetProps.iconicoverlays[0].iconicoverlaysimage != null) { props.lookup2('Iconic Overlays', 'Image', 1, assetProps.iconicoverlays[0].iconicoverlaysimage); }
        if (assetProps.iconicoverlays[0].iconicoverlaystitle != null) { props.input2.get('Iconic Overlays', 'Title', 1).setValue(assetProps.iconicoverlays[0].iconicoverlaystitle); }
        if (assetProps.iconicoverlays[0].iconicoverlayslink != null) { props.lookup2('Iconic Overlays', 'Link', 1, assetProps.iconicoverlays[0].iconicoverlayslink); }
        if (assetProps.iconicoverlays[0].iconicoverlayslinktext != null) { props.input2.get('Iconic Overlays', 'Link Text', 1).setValue(assetProps.iconicoverlays[0].iconicoverlayslinktext); }
        if (assetProps.iconicoverlays[0].iconicoverlaysdescriptiontext != null) { props.input2.get('Iconic Overlays', 'Description Text', 1).setValue(assetProps.iconicoverlays[0].iconicoverlaysdescriptiontext); }

    }
}

module.exports.ConfigureEditNavigationModule = (assetProps) => {
    if (assetProps.text != null) { props.input.get('Text').setValue(assetProps.text); }

    if (assetProps.addslides > "2") {

    }
    else {
        $('//label[contains(.,"Add Groups")]//i[@class="fa fa-plus"]').click();
        try {
            props.element('(//span[contains(@class,"pb-accordian-toggle")])[1]').click();
            props.element('(//span[contains(@class,"pb-accordian-toggle")])[1]').scroll(0, 350);
        }
        catch (err) {
            props.element('(//span[contains(@class,"pb-accordian-toggle")])[1]').scroll(0, 350);
            props.element('(//span[contains(@class,"pb-accordian-toggle")])[1]').click();
        }
        if (assetProps.groupheadersection[0].groups[0].grouptext != null) { props.input2.get('Group Header Section', 'Text', 1).setValue(assetProps.groupheadersection[0].groups[0].grouptext); }

        $('(//i[@class="fa fa-trash"])[2]').click();
        $('(//i[@class="fa fa-trash"])[3]').click();
        if (assetProps.groupheadersection[0].groups[0].grouplink != null) { props.lookup2('Group Header Section', 'Link', 1, assetProps.groupheadersection[0].groups[0].grouplink); }
        if (assetProps.groupheadersection[0].groups[0].groupitemlinks[0].grouplinkitemtext != null) { props.input2.get('Group Link Items', 'Text', 1).setValue(assetProps.groupheadersection[0].groups[0].groupitemlinks[0].grouplinkitemtext); }
        if (assetProps.groupheadersection[0].groups[0].groupitemlinks[0].grouplinkitemlink != null) { props.lookup2('Group Link Items', 'Link', 1, assetProps.groupheadersection[0].groups[0].groupitemlinks[0].grouplinkitemlink); }

        var count = browser.elements('(//span[contains(@class,"pb-accordian-toggle")])').value.length;
        try {
            props.element('(//span[contains(@class,"pb-accordian-toggle")])[' + count + ']').click();
            props.element('(//span[contains(@class,"pb-accordian-toggle")])[' + count + ']').scroll(0, 350);
        }
        catch (err) {
            browser.execute(() => {
                window.scrollTo(0, document.body.scrollHeight);
            });
            props.element('(//span[contains(@class,"pb-accordian-toggle")])[' + count + ']').click();
            browser.execute(() => {
                window.scrollTo(0, document.body.scrollHeight);
            });
        }
        var txtelement = (count * 2) - 1;
        if (assetProps.groupheadersection[0].groups[1].grouptext != null) { props.input2.get('Group Header Section', 'Text', txtelement).setValue(assetProps.groupheadersection[0].groups[1].grouptext); }
        if (assetProps.groupheadersection[0].groups[1].grouplink != null) { props.lookup2('Group Header Section', 'Link', txtelement, assetProps.groupheadersection[0].groups[1].grouplink); }
        if (assetProps.groupheadersection[0].groups[1].groupitemlinks[0].grouplinkitemtext != null) { props.input2.get('Group Link Items', 'Text', count).setValue(assetProps.groupheadersection[0].groups[1].groupitemlinks[0].grouplinkitemtext); }
        if (assetProps.groupheadersection[0].groups[1].groupitemlinks[0].grouplinkitemlink != null) { props.lookup2('Group Link Items', 'Link', count, assetProps.groupheadersection[0].groups[1].groupitemlinks[0].grouplinkitemlink); }
    }
}

module.exports.Configureeditsponsorboxmodule = (assetProps) => {

    //sponsor Logo update

    $('(//fieldset[legend[string()="Sponsor Logo"]]//i[@class="fa fa-trash"])[1]').click();
    $('(//fieldset[legend[string()="Sponsor Logo"]]//i[@class="fa fa-trash"])[1]').click();
    if (assetProps.logo != null) { props.lookup2('Sponsor Logo', 'Logo', 1, assetProps.logo); }
    if (assetProps.overridetext != null) { props.input2.get('Sponsor Logo', 'Override Text', 1).setValue(assetProps.overridetext); }
    if (assetProps.link != null) { props.lookup2('Sponsor Logo', 'Link', 1, assetProps.link); }

    //Header update
    $('(//fieldset[legend[string()="Header"]]//i[@class="fa fa-trash"])[1]').click();
    if (assetProps.headertext != null) { props.input2.get('Header', 'Header Text', 1).setValue(assetProps.headertext); }
    if (assetProps.headerlink != null) { props.lookup2('Header', 'Link', 1, assetProps.headerlink); }

    //adding new body copy
    props.element('//label[contains(.,"Add Body Copies")]//i[@class="fa fa-plus"]').scroll(0, 500);
    $('//label[contains(.,"Add Body Copies")]//i[@class="fa fa-plus"]').click();

    $('(//fieldset[legend[string()="Body Copy"]]//i[@class="fa fa-trash"])[1]').click();
    var bodycopyLegth = browser.elements('//fieldset[legend[string()="Body Copy"]]//label[contains(.,"Header Text")]').value.length;
    if (assetProps.bodycopy.length > 1) {
        //for more than one link.
        if (assetProps.bodycopy[0].headertext != null) { props.input2.get('Body Copy', 'Header Text', 1).setValue(assetProps.bodycopy[0].headertext); }
        if (assetProps.bodycopy[0].link != null) { props.lookup2('Body Copy', 'Link', 1, assetProps.bodycopy[0].link); }

        if (assetProps.bodycopy[1].headertext != null) { props.input2.get('Body Copy', 'Header Text', bodycopyLegth).setValue(assetProps.bodycopy[1].headertext); }
        if (assetProps.bodycopy[1].link != null) { props.lookup2('Body Copy', 'Link', bodycopyLegth, assetProps.bodycopy[1].link); }

    }
    else {
        if (assetProps.bodycopy[0].headertext != null) { props.input2.get('Body Copy', 'Header Text', 1).setValue(assetProps.bodycopy[0].headertext); }
        if (assetProps.bodycopy[0].link != null) { props.lookup2('Body Copy', 'Link', 1, assetProps.bodycopy[0].link); }
    }

    //body image
    //   props.element('//fieldset[legend[string()="Body Image"]]').scroll(0, 500);
    try {
        $('(//fieldset[legend[string()="Body Image"]]//i[@class="fa fa-trash"])[1]').click();
    }
    catch (err) {
        browser.execute(() => {
            var height = $(window).scrollTop() + 300;
            console.log(height);
            window.scrollTo(100, height);
        });
        $('(//fieldset[legend[string()="Body Image"]]//i[@class="fa fa-trash"])[1]').click();
    }

    $('(//fieldset[legend[string()="Body Image"]]//i[@class="fa fa-trash"])[1]').click();

    if (assetProps.bodyimagelogo != null) { props.lookup2('Body Image', 'Logo', 1, assetProps.bodyimagelogo); }
    if (assetProps.bodyimageoverridetext != null) { props.input2.get('Body Image', 'Override text', 1).setValue(assetProps.bodyimageoverridetext); }
    if (assetProps.bodyimageLink != null) { props.lookup2('Body Image', 'Link', 1, assetProps.bodyimageLink); }
    if (assetProps.bodyimageleft != 0) { props.checkbox2.get('Body Image', 'Left', 1).click(); }
    if (assetProps.bodyimageright != 0) { props.checkbox2.get('Body Image', 'Right', 1).click(); }

    //adding Body Links

    // props.element('//label[contains(.,"Add Body Links")]//i[@class="fa fa-plus"]').scroll(0, 800);
    try {
        props.element('//label[contains(.,"Add Body Links")]//i[@class="fa fa-plus"]').click();
    }
    catch (err) {
        browser.execute(() => {
            var height = $(window).scrollTop() + 400;
            console.log(height);
            window.scrollTo(100, height);
        });
        props.element('//label[contains(.,"Add Body Links")]//i[@class="fa fa-plus"]').click();

    }

    $('(//fieldset[legend[string()="Body Links"]]//i[@class="fa fa-trash"])[1]').click();
    var bodylinksLegth = browser.elements('//fieldset[legend[string()="Body Links"]]//label[contains(.,"Text")]').value.length;

    if (assetProps.bodylinks.length > 1) {
        //for more than one link.
        if (assetProps.bodylinks[0].bulletson != 0) { props.checkbox2.get('Body Links', 'Bullets On', 1).click(); }
        if (assetProps.bodylinks[0].text != null) { props.input2.get('Body Links', 'Text', 1).setValue(assetProps.bodylinks[0].text); }
        if (assetProps.bodylinks[0].link != null) { props.lookup2('Body Links', 'Link', 1, assetProps.bodylinks[0].link); }
        //new one
        if (assetProps.bodylinks[1].bulletson != 0) { props.checkbox2.get('Body Links', 'Bullets On', bodylinksLegth).click(); }
        if (assetProps.bodylinks[1].text != null) { props.input2.get('Body Links', 'Text', bodylinksLegth).setValue(assetProps.bodylinks[1].text); }
        if (assetProps.bodylinks[1].link != null) { props.lookup2('Body Links', 'Link', bodylinksLegth, assetProps.bodylinks[1].link); }

    }
    else {
        if (assetProps.bodylinks[0].bulletson != 0) { props.checkbox2.get('Body Links', 'Bullets On', 1).click(); }
        if (assetProps.bodylinks[0].text != null) { props.input2.get('Body Links', 'Text', 1).setValue(assetProps.bodylinks[0].text); }
        if (assetProps.bodylinks[0].link != null) { props.lookup2('Body Links', 'Link', 1, assetProps.bodylinks[0].link); }
    }


    // props.element('//label[contains(.,"Add Lower Links")]//i[@class="fa fa-plus"]').scroll(0, 700);
    try {
        props.element('//label[contains(.,"Add Lower Links")]//i[@class="fa fa-plus"]').click();
        browser.execute(() => {
            var height = $(window).scrollTop() + 300;
            window.scrollTo(0, height);
        });
    }
    catch (err) {
        browser.execute(() => {
            var height = $(window).scrollTop() + 500;
            window.scrollTo(0, height);
        });
        props.element('//label[contains(.,"Add Lower Links")]//i[@class="fa fa-plus"]').click();
    }

    $('(//fieldset[legend[string()="Lower Links"]]//i[@class="fa fa-trash"])[1]').click();

    var lowerlinksLegth = browser.elements('//fieldset[legend[string()="Lower Links"]]//label[contains(.,"Text")]').value.length;

    if (assetProps.lowerlinks.length > 1) {
        //for more than one link.
        if (assetProps.lowerlinks[0].bulletson != 0) { props.checkbox2.get('Lower Links', 'Bullets On', 1).click(); }
        if (assetProps.lowerlinks[0].newpage != 0) { props.checkbox2.get('Lower Links', 'New Page', 1).click(); }
        if (assetProps.lowerlinks[0].rollover != 0) { props.checkbox2.get('Lower Links', 'Rollover', 1).click(); }
        if (assetProps.lowerlinks[0].text != null) { props.input2.get('Lower Links', 'Text', 1).setValue(assetProps.lowerlinks[0].text); }
        if (assetProps.lowerlinks[0].link != null) { props.lookup2('Lower Links', 'Link', 1, assetProps.lowerlinks[0].link); }

        //adding
        if (assetProps.lowerlinks[0].bulletson != 0) { props.checkbox2.get('Lower Links', 'Bullets On', lowerlinksLegth).click(); }
        if (assetProps.lowerlinks[0].newpage != 0) { props.checkbox2.get('Lower Links', 'New Page', lowerlinksLegth).click(); }
        if (assetProps.lowerlinks[0].rollover != 0) { props.checkbox2.get('Lower Links', 'Rollover', lowerlinksLegth).click(); }
        if (assetProps.lowerlinks[0].text != null) { props.input2.get('Lower Links', 'Text', lowerlinksLegth).setValue(assetProps.lowerlinks[1].text); }
        if (assetProps.lowerlinks[0].link != null) { props.lookup2('Lower Links', 'Link', lowerlinksLegth, assetProps.lowerlinks[1].link); }

    }
    else {
        if (assetProps.lowerlinks[0].bulletson != 0) { props.checkbox2.get('Lower Links', 'Bullets On', 1).click(); }
        if (assetProps.lowerlinks[0].newpage != 0) { props.checkbox2.get('Lower Links', 'New Page', 1).click(); }
        if (assetProps.lowerlinks[0].rollover != 0) { props.checkbox2.get('Lower Links', 'Rollover', 1).click(); }
        if (assetProps.lowerlinks[0].text != null) { props.input2.get('Lower Links', 'Text', 1).setValue(assetProps.lowerlinks[0].text); }
        if (assetProps.lowerlinks[0].link != null) { props.lookup2('Lower Links', 'Link', 1, assetProps.lowerlinks[0].link); }
    }
    if (assetProps.importcontent != null) { props.lookup2('Article', 'Import Content', 1, assetProps.importcontent); }
}

module.exports.ConfigureEditverticalpromomodule = (assetProps) => {

    $('(//fieldset[legend[string()="Background Image"]]//i[@class="fa fa-trash"])[1]').click();
    $('(//fieldset[legend[string()="Background Image"]]//i[@class="fa fa-trash"])[1]').click();

    if (assetProps.image != null) { props.lookup('Image', assetProps.image); }
    if (assetProps.introtext != null) { props.input.get('Intro Text').setValue(assetProps.introtext); }
    if (assetProps.buttonlink != null) { props.lookup('Button Link', assetProps.buttonlink); }
    if (assetProps.buttontext != null) { props.input.get('Button Text').setValue(assetProps.buttontext); }

    if (assetProps.descriptiontext != null) { props.input.get('Description Text').setValue(assetProps.descriptiontext); }

    try {
        props.element('//label[contains(.,"Add Iconic Overlay:")]//i[@class="fa fa-plus"]').click();
        browser.execute(() => {
            var height = $(window).scrollTop() + 400;
            console.log(height);
            window.scrollTo(100, height);
        });
    }
    catch (err) {
        browser.execute(() => {
            var height = $(window).scrollTop() + 400;
            console.log(height);
            window.scrollTo(100, height);
        });
        props.element('//label[contains(.,"Add Iconic Overlay:")]//i[@class="fa fa-plus"]').click();

    }

    //Iconic Overlays
    var OverlaysLegth = browser.elements('//span[contains(@class,"pb-accordian-toggle")]').value.length;
    if (assetProps.iconicoverlays.length > 1) {
        //for more than one link.
        try {
            props.element('(//span[contains(@class,"pb-accordian-toggle")])[1]').click();
        }
        catch (err) {
            props.element('(//span[contains(@class,"pb-accordian-toggle")])[1]').scroll(0, 500);
            props.element('(//span[contains(@class,"pb-accordian-toggle")])[1]').click();
        }
        $('(//fieldset[legend[string()="Iconic Overlays"]]//i[@class="fa fa-trash"])[1]').click();
        $('(//fieldset[legend[string()="Iconic Overlays"]]//i[@class="fa fa-trash"])[1]').click();

        if (assetProps.iconicoverlays[0].iconicoverlaysimage != null) { props.lookup2('Iconic Overlays', 'Image', 1, assetProps.iconicoverlays[0].iconicoverlaysimage); }
        if (assetProps.iconicoverlays[0].iconicoverlaystitle != null) { props.input2.get('Iconic Overlays', 'Title', 1).setValue(assetProps.iconicoverlays[0].iconicoverlaystitle); }
        if (assetProps.iconicoverlays[0].iconicoverlayslink != null) { props.lookup2('Iconic Overlays', 'Link', 1, assetProps.iconicoverlays[0].iconicoverlayslink); }
        if (assetProps.iconicoverlays[0].iconicoverlayslinktext != null) { props.input2.get('Iconic Overlays', 'Link Text', 1).setValue(assetProps.iconicoverlays[0].iconicoverlayslinktext); }
        if (assetProps.iconicoverlays[0].iconicoverlaysdescriptiontext != null) { props.input2.get('Iconic Overlays', 'Description Text', 1).setValue(assetProps.iconicoverlays[0].iconicoverlaysdescriptiontext); }

        //adding new
        try {
            props.element('(//span[contains(@class,"pb-accordian-toggle")])[' + OverlaysLegth + ']').click();
        }
        catch (err) {
            browser.execute(() => {
                var height = document.body.scrollHeight;
                // console.log(height);
                window.scrollTo(100, height);
            });
            props.element('(//span[contains(@class,"pb-accordian-toggle")])[' + OverlaysLegth + ']').click();
        }
        if (assetProps.iconicoverlays[1].iconicoverlaysimage != null) { props.lookup2('Iconic Overlays', 'Image', OverlaysLegth, assetProps.iconicoverlays[1].iconicoverlaysimage); }
        if (assetProps.iconicoverlays[1].iconicoverlaystitle != null) { props.input2.get('Iconic Overlays', 'Title', OverlaysLegth).setValue(assetProps.iconicoverlays[1].iconicoverlaystitle); }
        if (assetProps.iconicoverlays[1].iconicoverlayslink != null) { props.lookup2('Iconic Overlays', 'Link', OverlaysLegth, assetProps.iconicoverlays[1].iconicoverlayslink); }
        if (assetProps.iconicoverlays[1].iconicoverlayslinktext != null) { props.input2.get('Iconic Overlays', 'Link Text', OverlaysLegth).setValue(assetProps.iconicoverlays[1].iconicoverlayslinktext); }
        if (assetProps.iconicoverlays[1].iconicoverlaysdescriptiontext != null) { props.input2.get('Iconic Overlays', 'Description Text', OverlaysLegth).setValue(assetProps.iconicoverlays[1].iconicoverlaysdescriptiontext); }

    }
    else {
        try {
            props.element('(//span[contains(@class,"pb-accordian-toggle")])[1]').click();
        }
        catch (err) {
            props.element('(//span[contains(@class,"pb-accordian-toggle")])[1]').scroll(0, 500);
            props.element('(//span[contains(@class,"pb-accordian-toggle")])[1]').click();
        }
        if (assetProps.iconicoverlays[0].iconicoverlaysimage != null) { props.lookup2('Iconic Overlays', 'Image', 1, assetProps.iconicoverlays[0].iconicoverlaysimage); }
        if (assetProps.iconicoverlays[0].iconicoverlaystitle != null) { props.input2.get('Iconic Overlays', 'Title', 1).setValue(assetProps.iconicoverlays[0].iconicoverlaystitle); }
        if (assetProps.iconicoverlays[0].iconicoverlayslink != null) { props.lookup2('Iconic Overlays', 'Link', 1, assetProps.iconicoverlays[0].iconicoverlayslink); }
        if (assetProps.iconicoverlays[0].iconicoverlayslinktext != null) { props.input2.get('Iconic Overlays', 'Link Text', 1).setValue(assetProps.iconicoverlays[0].iconicoverlayslinktext); }
        if (assetProps.iconicoverlays[0].iconicoverlaysdescriptiontext != null) { props.input2.get('Iconic Overlays', 'Description Text', 1).setValue(assetProps.iconicoverlays[0].iconicoverlaysdescriptiontext); }

    }
}

module.exports.configureediteditorialmodule = (assetProps) => {

    if (assetProps.moduletitle != null) { props.input.get('Module Title').setValue(assetProps.moduletitle); }
    if (assetProps.link != null) { props.lookup('Link', assetProps.link); }

    //add module links
    try {
        $('//label[contains(.,"Add Links")]//i[@class="fa fa-plus"]').click();
        browser.execute(() => {
            var height = $(window).scrollTop() + 100;
            // console.log(height);
            window.scrollTo(100, height);
        });
    }
    catch (err) {
        browser.execute(() => {
            var height = $(window).scrollTop() + 500;
            // console.log(height);
            window.scrollTo(100, height);
        });
        $('//label[contains(.,"Add Links")]//i[@class="fa fa-plus"]').click();
    }

    if (assetProps.modulelinks.length > 1) {

        var linkCount = browser.elements('//fieldset[legend[string()="Module Links"]]//label[contains(.,"Image")]').value.length;
        //for more than one link.     
        if (browser.isExisting('(//fieldset[legend[string()="Module Links"]]//label[contains(.,"Image")]//i[@class="fa fa-trash"])[0]') == true)
            $('(//fieldset[legend[string()="Module Links"]]//label[contains(.,"Image")]//i[@class="fa fa-trash"])[1]').click();
        $('(//fieldset[legend[string()="Module Links"]]//label[contains(.,"Link")]//i[@class="fa fa-trash"])[1]').click();

        if (assetProps.modulelinks[0].modulelinksimage != null) { props.lookup2('Module Links', 'Image', 1, assetProps.modulelinks[0].modulelinksimage); }
        if (assetProps.modulelinks[0].modulelinkslinktext != null) { props.input2.get('Module Links', 'Link Text', 1).setValue(assetProps.modulelinks[0].modulelinkslinktext); }
        if (assetProps.modulelinks[0].modulelinkslink != null) { props.lookup2('Module Links', 'Link', 1, assetProps.modulelinks[0].modulelinkslink); }
        if (assetProps.modulelinks[0].modulelinksactiontext != null) { props.input2.get('Module Links', 'Action Text', 1).setValue(assetProps.modulelinks[0].modulelinksactiontext); }

        //ADDING NEW         
        if (assetProps.modulelinks[1].modulelinksimage != null) { props.lookup2('Module Links', 'Image', linkCount, assetProps.modulelinks[1].modulelinksimage); }
        if (assetProps.modulelinks[1].modulelinkslinktext != null) { props.input2.get('Module Links', 'Link Text', linkCount).setValue(assetProps.modulelinks[1].modulelinkslinktext); }
        if (assetProps.modulelinks[1].modulelinkslink != null) { props.lookup2('Module Links', 'Link', linkCount, assetProps.modulelinks[1].modulelinkslink); }
        if (assetProps.modulelinks[1].modulelinksactiontext != null) { props.input2.get('Module Links', 'Action Text', linkCount).setValue(assetProps.modulelinks[1].modulelinksactiontext); }
    }
    else {
        if (assetProps.modulelinks[0].modulelinksimage != null) { props.lookup2('Module Links', 'Image', 1, assetProps.modulelinksimage); }
        if (assetProps.modulelinks[0].modulelinkslinktext != null) { props.input2.get('Module Links', 'Link Text', 1).setValue(assetProps.modulelinkslinktext); }
        if (assetProps.modulelinks[0].modulelinkslink != null) { props.lookup2('Module Links', 'Link', 1, assetProps.modulelinks[0].modulelinkslink); }
        if (assetProps.modulelinks[0].modulelinksactiontext != null) { props.input2.get('Module Links', 'Action Text', 1).setValue(assetProps.modulelinksactiontext); }
    }

    //adding description link
    try {
        $('//label[contains(.,"Add Descriptions:")]//i[@class="fa fa-plus"]').click();
        browser.execute(() => {
            var height = $(window).scrollTop() + 500;
            // console.log(height);
            window.scrollTo(100, height);
        });
    }
    catch (err) {
        browser.execute(() => {
            var height = $(window).scrollTop() + 500;
            // console.log(height);
            window.scrollTo(100, height);
        });
        $('//label[contains(.,"Add Descriptions:")]//i[@class="fa fa-plus"]').click();
    }

    var descLength = browser.elements('//label[contains(.,"Description:")]').value.length;

    if (assetProps.descriptions.length > 1) {
        //for more than one link.
        if (assetProps.descriptions[0].description != null) { props.input2.get('Descriptions', 'Description', 1).setValue(assetProps.descriptions[0].description); }

        if (assetProps.descriptions[1].description != null) { props.input2.get('Descriptions', 'Description', descLength - 1).setValue(assetProps.descriptions[1].description); }
    }
    else {
        if (assetProps.descriptions[0].description != null) { props.input.get('Description').setValue(assetProps.descriptions[0].description); }
    }

    try {
        $('//label[contains(.,"Add Images:")]//i[@class="fa fa-plus"]').click();
        browser.execute(() => {
            var height = $(window).scrollTop() + 200;
            // console.log(height);
            window.scrollTo(100, height);
        });
    }
    catch (err) {
        browser.execute(() => {
            var height = $(window).scrollTop() + 500;
            // console.log(height);
            window.scrollTo(100, height);
        });
        $('//label[contains(.,"Add Images:")]//i[@class="fa fa-plus"]').click();
    }
    var imagesCount = browser.elements('//fieldset[legend[string()="Linked Images"]]//label[contains(.,"Link")]').value.length;
    if (assetProps.linkedimages.length > 1) {
        //for more than one link.
        if (assetProps.linkedimages[0].linkedimagesimage != null) { props.lookup2('Linked Images', 'Image', 1, assetProps.linkedimages[0].linkedimagesimage); }
        if (assetProps.linkedimages[0].linkedimageslink != null) { props.lookup2('Linked Images', 'Link', 1, assetProps.linkedimages[0].linkedimageslink); }
        if (assetProps.linkedimages[0].OverrideText != null) { props.input2.get('Linked Images', 'Override Text', 1).setValue(assetProps.linkedimages[0].OverrideText); }

        //added neww
        if (assetProps.linkedimages[1].linkedimagesimage != null) { props.lookup2('Linked Images', 'Image', imagesCount, assetProps.linkedimages[1].linkedimagesimage); }
        if (assetProps.linkedimages[1].linkedimageslink != null) { props.lookup2('Linked Images', 'Link', imagesCount, assetProps.linkedimages[1].linkedimageslink); }
        if (assetProps.linkedimages[1].OverrideText != null) { props.input2.get('Linked Images', 'Override Text', imagesCount).setValue(assetProps.linkedimages[1].OverrideText); }

    }
    else {
        if (assetProps.linkedimages[0].linkedimagesimage != null) { props.lookup2('Linked Images', 'Image', 1, assetProps.linkedimages[0].linkedimagesimage); }
        if (assetProps.linkedimages[0].linkedimageslink != null) { props.lookup2('Linked Images', 'Link', 1, assetProps.linkedimages[0].linkedimageslink); }
        if (assetProps.linkedimages[0].linkedimagesimage != null) { props.lookup2('Linked Images', 'Image', 1, assetProps.linkedimages[0].linkedimagesimage); }

    }

    if (assetProps.importarticlecontent != null) { props.input.get('Import Article Content').setValue(assetProps.importarticlecontent); }


}

module.exports.configureHtmlModule = (assetProps) => {
    if (assetProps.ModuleHTML) { props.textarea.get('Module HTML').setValue(assetProps.ModuleHTML); }
}
module.exports.EditconfigureHtmlModule = (assetProps) => {
    if (assetProps.ModuleHTML) { props.textarea.get('Module HTML').setValue(assetProps.ModuleHTMLEdit); }
}

module.exports.ConfigureLinkListModule = (assetProps) => {

    //Populate Module Title Section
    let moduleTitleSection = assetProps.moduleTitle;
    if (moduleTitleSection.moduleTile != null) { props.input.get('Module Title').setValue(moduleTitleSection.moduleTile); }
    if (moduleTitleSection.link != null) { props.input.get('Link').setValue(moduleTitleSection.link); }

    let moduleLinksSection = assetProps.moduleLinks;
    let moduleLinksCount = moduleLinksSection.length;

    //Add more links if necessary
    if (moduleLinksCount > 1) {
        props.element('//label[contains(.,"Add Links:")]//input').setValue(moduleLinksCount - 1)
        props.element('//label[contains(.,"Add Links:")]//button').click();
    }

    //Populate Module Links section
    for(let i = 1; i <= moduleLinksCount; i++)
    {
        let linkText = moduleLinksSection[i-1].linkText;
        let link = moduleLinksSection[i-1].link;
        let icon = moduleLinksSection[i-1].icon;

        if(linkText != null) { props.input2.get('Module Links', 'Link Text', i).setValue(moduleLinksSection[i-1].linkText); }
        if(link != null) { props.lookup2('Module Links', 'Link', i, link); }
        if(icon != null) { props.lookup2('Module Links', 'Icon', i, link); }
    }

    //Populate Emphasized Links Section
    let emphasizedLinksSection = assetProps.emphasizedLinks;
    let linkText = emphasizedLinksSection.linkText;
    let link = emphasizedLinksSection.link;
    
    if(linkText != null) { props.input2.get('Emphasized Link', 'Link Text', 1).setValue(linkText); }
    if(link != null) { props.lookup2('Emphasized Link', 'Link Text', 1, linkText); }
}