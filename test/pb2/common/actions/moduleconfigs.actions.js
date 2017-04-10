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

module.exports.ConfigureSponsorBoxModule = (assetProps) =>
{
     if ( assetProps.logo != null ) { props.lookup2('Sponsor Logo', 'Logo', 1, assetProps.logo); }
     if ( assetProps.overridetext != null ) { props.input2.get('Sponsor Logo', 'Override Text', 1).setValue(assetProps.overridetext); }
     if ( assetProps.link != null ) { props.lookup2('Sponsor Logo','Link', 1, assetProps.link); }
     if ( assetProps.headertext != null ) { props.input2.get('Header','Header Text', 1).setValue(assetProps.headertext); }
     if ( assetProps.headerlink != null ) { props.lookup2('Header','Link', 1, assetProps.headerlink); }
     
     if(assetProps.bodycopy.length > 1)
     {
        //for more than one link.
     }
     else
     {
         if ( assetProps.bodycopy[0].bodycopyheadertext != null ) { props.input2.get('Body Copy', 'Header Text', 1).setValue(assetProps.bodycopy[0].headertext); }
         if ( assetProps.bodycopy[0].bodycopylink != null ) { props.lookup2('Body Copy', 'Link', 1, assetProps.bodycopy[0].link); }
     }

    
    if ( assetProps.bodyimagelogo != null ) { props.lookup2('Body Image', 'Logo', 1, assetProps.bodyimagelogo); }
    if ( assetProps.bodyimageoverridetext != null ) { props.input2.get('Body Image', 'Override text', 1).setValue(assetProps.bodyimageoverridetext); }
    if ( assetProps.bodyimageLink != null ) { props.lookup2('Body Image', 'Link', 1, assetProps.bodyimageLink); }
    if ( assetProps.bodyimageleft != 0 ) { props.checkbox2.get('Body Image', 'Left', 1).click(); }
    if ( assetProps.bodyimageright != 0 ) { props.checkbox2.get('Body Image', 'Right', 1).click(); }

     if(assetProps.bodylinks.length > 1)
     {
        //for more than one link.
     }
     else
     {
         if ( assetProps.bodylinks[0].bulletson != 0 ) { props.checkbox2.get('Body Links', 'Bullets On', 1).click(); }
         if ( assetProps.bodylinks[0].text != null ) { props.input2.get('Body Links', 'Text', 1).setValue(assetProps.bodylinks[0].text); }
         if ( assetProps.bodylinks[0].link != null ) { props.lookup2('Body Links', 'Link', 1, assetProps.bodylinks[0].link); }
     }
     
     if(assetProps.lowerlinks.length > 1)
     {
        //for more than one link.
     }
     else
     {
         if ( assetProps.lowerlinks[0].bulletson != 0 ) { props.checkbox2.get('Lower Links', 'Bullets On', 1).click(); }
         if ( assetProps.lowerlinks[0].newpage != 0 ) { props.checkbox2.get('Lower Links', 'New Page', 1).click(); }
         if ( assetProps.lowerlinks[0].rollover != 0 ) { props.checkbox2.get('Lower Links', 'Rollover', 1).click(); }
         if ( assetProps.lowerlinks[0].text != null ) { props.input2.get('Lower Links', 'Text', 1).setValue(assetProps.lowerlinks[0].text); }
         if ( assetProps.lowerlinks[0].link != null ) { props.lookup2('Lower Links', 'Link', 1, assetProps.lowerlinks[0].link); }
     }
      if ( assetProps.importcontent != null ) { props.lookup2('Article', 'Import Content', 1, assetProps.importcontent); }
}

module.exports.ConfigureNavigationModule = (assetProps) =>
{
     if ( assetProps.text != null ) { props.input.get('Text').setValue(assetProps.text); }
         
     if(assetProps.addslides > "2")
     {
       
     }
     else
     {
         props.element('(//span[contains(@class,"pb-accordian-toggle")])[1]').click();
         if ( assetProps.groupheadersection[0].groups[0].grouptext != null ) { props.input2.get('Group Header Section','Text', 1).setValue(assetProps.groupheadersection[0].groups[0].grouptext); }
         if ( assetProps.groupheadersection[0].groups[0].grouplink != null ) { props.lookup2('Group Header Section','Link', 1, assetProps.groupheadersection[0].groups[0].grouplink); }
         if ( assetProps.groupheadersection[0].groups[0].groupitemlinks[0].grouplinkitemtext != null ) { props.input2.get('Group Link Items', 'Text', 1).setValue(assetProps.groupheadersection[0].groups[0].groupitemlinks[0].grouplinkitemtext); }
         if ( assetProps.groupheadersection[0].groups[0].groupitemlinks[0].grouplinkitemlink != null ) { props.lookup2('Group Link Items', 'Link', 1, assetProps.groupheadersection[0].groups[0].groupitemlinks[0].grouplinkitemlink); }
         props.element('(//span[contains(@class,"pb-accordian-toggle")])[2]').click();
         if ( assetProps.groupheadersection[0].groups[1].grouptext != null ) { props.input2.get('Group Header Section', 'Text', 3).setValue(assetProps.groupheadersection[0].groups[1].grouptext); }
         if ( assetProps.groupheadersection[0].groups[1].grouplink != null ) { props.lookup2('Group Header Section', 'Link', 3, assetProps.groupheadersection[0].groups[1].grouplink); }
         if ( assetProps.groupheadersection[0].groups[1].groupitemlinks[0].grouplinkitemtext != null ) { props.input2.get('Group Link Items', 'Text', 2).setValue(assetProps.groupheadersection[0].groups[1].groupitemlinks[0].grouplinkitemtext); }
         if ( assetProps.groupheadersection[0].groups[1].groupitemlinks[0].grouplinkitemlink != null ) { props.lookup2('Group Link Items', 'Link', 2, assetProps.groupheadersection[0].groups[1].groupitemlinks[0].grouplinkitemlink); }
     }

      
}
