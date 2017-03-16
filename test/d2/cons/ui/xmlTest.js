var parseString = require('xml2js').parseString;
var Promise = require('bluebird');
var request = require('request');
var parseXml = require('./../common/parseXml.js');

describe('Xml Test', function () {
  //  before(function () {

  //       browser.addCommand('Publish', common.Publish.bind(browser));
  //       browser.addCommand('LifeCycle', common.LifeCycle.bind(browser));
  //       browser.addCommand('CheckoutAndCheckin', common.CheckoutAndCheckin.bind(browser))
  //       browser.addCommand('EditProperties', common.EditProperties.bind(browser));
  //       browser.addCommand('CreateNewContent', common.CreateNewContent.bind(browser));
  //       browser.addCommand('Navigation', common.Navigation.bind(browser));
  //       browser.addCommand('login', common.login.bind(browser));
  //       browser.addCommand('interactivemodulebullet', interactivearticles.interactivemodulebullet.bind(browser));
  //       browser.addCommand('interactiveModuleBulletMenu', interactivearticles.interactiveModuleBulletMenu.bind(browser));
  //       browser.addCommand('interactiveModuleBulletAvailability', interactivearticles.interactiveModuleBulletAvailability.bind(browser));
  //       browser.addCommand('interactiveModuleBulletList', interactivearticles.interactiveModuleBulletList.bind(browser));
  //       browser.addCommand('interactiveModuleBulletModule', interactivearticles.interactiveModuleBulletModule.bind(browser));
  //       browser.addCommand('interactiveModuleBulletListEdit', interactivearticles.interactiveModuleBulletListEdit.bind(browser));
  //       browser.addCommand('interactiveModuleBulletTitleDescription', interactivearticles.interactiveModuleBulletTitleDescription.bind(browser));
  //        browser.addCommand('interactiveModuleBulletAlign', interactivearticles.interactiveModuleBulletAlign.bind(browser));
  //        browser.addCommand('interactiveModuleBulletListXML', interactivearticles.interactiveModuleBulletListXML.bind(browser));
  //        browser.addCommand('interactiveModuleBulletListXMLValidation', interactivearticles.interactiveModuleBulletListXMLValidation.bind(browser));
  //        browser.addCommand('randomtext', common.GenerateRandomText.bind(browser));
  //       browser.addCommand('getUrlAndTitle', common.getUrlAndTitle.bind(browser));
  //       browser.setViewportSize({
  //           width: 1920,
  //           height: 1080
  //       });
  //       browser.login({
  //           url: common.getEnvTestUrl(),
  //           username: common.getQAPublicationInfo().username,
  //           password: common.getQAPublicationInfo().password
  //       });
  //       browser.Navigation(browser, global.d2ConDataSettings.inputData.rootnode, global.d2ConDataSettings.inputData.rotpath);
  //   });

  // var testUrl = 'http://ats.dev04.webmd.com/SCSFile.aspx?ID=091e9c5e814827ee';
 var testUrl = 'http://ats.dev04.webmd.com/SCSFile.aspx?ID=091e9c5e814863ca';
 // var testUrl='http://ats.dev04.webmd.com/SCSFile.aspx?ID=091e9c5e81487781';

  // var expectedAlignment = 'right';
  // var expectedclass = 'wbmdembededmodule cke_widget_inline';
  // var expectedmoduleTitle = 'QAModuleHeadline';
  // var expectedmoduleDescription = 'QAModuleDescription';
  // var expectedstyle = 'float:right;';
  // var expectedtype = 'bulletedlist';
  // var expectedbullettitle = 'QATest_News_XML';
  // var expectedbulletdescription = 'QABulletDescription';

  var expectedAlignment= 'left';
  var expectedclass= 'wbmdembededmodule cke_widget_inline';
  var expectedmoduleTitle= 'QA';
  var expectedmoduleDescription= 'QA';
  var expectedstyle='float:left;';
  var expectedtype='bulletedlist';
  var expectedbullettitle='QAtest';
  var expectedbulletdescription='D2';


  it('Xml get attribute and node values', function () {
    return Promise.resolve(
      parseXml.getXmlFromUrl(testUrl, null).then(function (result) {

        var sectiontextalignment = result.wbmd_asset.content_section[0].cons_news[0].section_groups[0].section_group[0].section_text[0].embeded_module[0].$.align;
        var sectiontextClass = result.wbmd_asset.content_section[0].cons_news[0].section_groups[0].section_group[0].section_text[0].embeded_module[0].$.class;
        var sectiontextmoduleTitle = result.wbmd_asset.content_section[0].cons_news[0].section_groups[0].section_group[0].section_text[0].embeded_module[0].$.module_title;
        var sectiontextmoduleDescription = result.wbmd_asset.content_section[0].cons_news[0].section_groups[0].section_group[0].section_text[0].embeded_module[0].$.module_description;
        var sectiontextstyle = result.wbmd_asset.content_section[0].cons_news[0].section_groups[0].section_group[0].section_text[0].embeded_module[0].$.style;
        //  var sectiontextType = result.wbmd_asset.content_section[0].cons_news[0].section_groups[0].section_group[0].section_text[0].embeded_module[0].$.type;                                             
        var sectiontextbulletTitle = result.wbmd_asset.content_section[0].cons_news[0].section_groups[0].section_group[0].section_text[0].embeded_module[0].bulletlist[0].bulletitem[0].btitle[0];
        var sectiontextbulletDescription = result.wbmd_asset.content_section[0].cons_news[0].section_groups[0].section_group[0].section_text[0].embeded_module[0].bulletlist[0].bulletitem[0].description[0].p[0];
        expect(expectedAlignment).to.equal(sectiontextalignment);
        expect(expectedclass).to.equal(sectiontextClass);
        expect(expectedmoduleTitle).to.equal(sectiontextmoduleTitle);
        expect(expectedmoduleDescription).to.equal(sectiontextmoduleDescription);
        expect(expectedstyle).to.equal(sectiontextstyle);
        //   expect(expectedtype).to.equal(sectiontextType);
        expect(expectedbullettitle).to.equal(sectiontextbulletTitle);
        expect(expectedbulletdescription).to.equal(sectiontextbulletDescription);


        var highlightalignment = result.wbmd_asset.content_section[0].cons_news[0].section_groups[0].section_group[0].highlights[0].embeded_module[0].$.align;
        var highlightClass = result.wbmd_asset.content_section[0].cons_news[0].section_groups[0].section_group[0].highlights[0].embeded_module[0].$.class;
        var highlightmoduleTitle = result.wbmd_asset.content_section[0].cons_news[0].section_groups[0].section_group[0].highlights[0].embeded_module[0].$.module_title;
        var highlightmoduleDescription = result.wbmd_asset.content_section[0].cons_news[0].section_groups[0].section_group[0].highlights[0].embeded_module[0].$.module_description;
        var highlightstyle = result.wbmd_asset.content_section[0].cons_news[0].section_groups[0].section_group[0].highlights[0].embeded_module[0].$.style;
        //  var hightlightType = result.wbmd_asset.content_section[0].cons_news[0].section_groups[0].section_group[0].highlights[0].embeded_module[0].$.type;                                             
        var highlightbulletTitle = result.wbmd_asset.content_section[0].cons_news[0].section_groups[0].section_group[0].highlights[0].embeded_module[0].bulletlist[0].bulletitem[0].btitle[0];
        var highlightbulletDescription = result.wbmd_asset.content_section[0].cons_news[0].section_groups[0].section_group[0].highlights[0].embeded_module[0].bulletlist[0].bulletitem[0].description[0].p[0];

        expect(expectedAlignment).to.equal(highlightalignment);
        expect(expectedclass).to.equal(highlightClass);
        expect(expectedmoduleTitle).to.equal(highlightmoduleTitle);
        expect(expectedmoduleDescription).to.equal(highlightmoduleDescription);
        expect(expectedstyle).to.equal(highlightstyle);
        //   expect(expectedtype).to.equal(hightlightType);
        expect(expectedbullettitle).to.equal(highlightbulletTitle);
        expect(expectedbulletdescription).to.equal(highlightbulletDescription);

        var pullquotesalignment = result.wbmd_asset.content_section[0].cons_news[0].section_groups[0].section_group[0].pull_quotes[0].embeded_module[0].$.align;
        var pullquotesClass = result.wbmd_asset.content_section[0].cons_news[0].section_groups[0].section_group[0].pull_quotes[0].embeded_module[0].$.class;
        var pullquotesmoduleTitle = result.wbmd_asset.content_section[0].cons_news[0].section_groups[0].section_group[0].pull_quotes[0].embeded_module[0].$.module_title;
        var pullquotesmoduleDescription = result.wbmd_asset.content_section[0].cons_news[0].section_groups[0].section_group[0].pull_quotes[0].embeded_module[0].$.module_description;
        var pullquotesstyle = result.wbmd_asset.content_section[0].cons_news[0].section_groups[0].section_group[0].pull_quotes[0].embeded_module[0].$.style;
        //  var pullquotesType = result.wbmd_asset.content_section[0].cons_news[0].section_groups[0].section_group[0].pull_quotes[0].embeded_module[0].$.type;                                             
        var pullquotesTitle = result.wbmd_asset.content_section[0].cons_news[0].section_groups[0].section_group[0].pull_quotes[0].embeded_module[0].bulletlist[0].bulletitem[0].btitle[0];
        var pullquotesDescription = result.wbmd_asset.content_section[0].cons_news[0].section_groups[0].section_group[0].pull_quotes[0].embeded_module[0].bulletlist[0].bulletitem[0].description[0].p[0];

        expect(expectedAlignment).to.equal(pullquotesalignment);
        expect(expectedclass).to.equal(pullquotesClass);
        expect(expectedmoduleTitle).to.equal(pullquotesmoduleTitle);
        expect(expectedmoduleDescription).to.equal(pullquotesmoduleDescription);
        expect(expectedstyle).to.equal(pullquotesstyle);
        //   expect(expectedtype).to.equal(pullquotesType);
        expect(expectedbullettitle).to.equal(pullquotesTitle);
        expect(expectedbulletdescription).to.equal(pullquotesDescription);

        var citationsalignment = result.wbmd_asset.content_section[0].cons_news[0].citations[0].embeded_module[0].$.align;
        var citationsClass = result.wbmd_asset.content_section[0].cons_news[0].citations[0].embeded_module[0].$.class;
        var citationsTitle = result.wbmd_asset.content_section[0].cons_news[0].citations[0].embeded_module[0].$.module_title;
        var citationsDescription = result.wbmd_asset.content_section[0].cons_news[0].citations[0].embeded_module[0].$.module_description;
        var citationsstyle = result.wbmd_asset.content_section[0].cons_news[0].citations[0].embeded_module[0].$.style;
        //  var citationsType = result.wbmd_asset.content_section[0].cons_news[0].citations[0].embeded_module[0].$.type;                                             
        var citationsbulletTitle = result.wbmd_asset.content_section[0].cons_news[0].citations[0].embeded_module[0].bulletlist[0].bulletitem[0].btitle[0];
        var citationsbulletDescription = result.wbmd_asset.content_section[0].cons_news[0].citations[0].embeded_module[0].bulletlist[0].bulletitem[0].description[0].p[0];

        expect(expectedAlignment).to.equal(citationsalignment);
        expect(expectedclass).to.equal(citationsClass);
        expect(expectedmoduleTitle).to.equal(citationsTitle);
        expect(expectedmoduleDescription).to.equal(citationsDescription);
        expect(expectedstyle).to.equal(citationsstyle);
        //   expect(expectedtype).to.equal(citationsType);
        expect(expectedbullettitle).to.equal(citationsbulletTitle);
        expect(expectedbulletdescription).to.equal(citationsbulletDescription);

        var relatedlinksalignment = result.wbmd_asset.content_section[0].cons_news[0].related_links_text[0].embeded_module[0].$.align;
        var relatedlinksClass = result.wbmd_asset.content_section[0].cons_news[0].related_links_text[0].embeded_module[0].$.class;
        var relatedlinksTitle = result.wbmd_asset.content_section[0].cons_news[0].related_links_text[0].embeded_module[0].$.module_title;
        var relatedlinksDescription = result.wbmd_asset.content_section[0].cons_news[0].related_links_text[0].embeded_module[0].$.module_description;
        var relatedlinksstyle = result.wbmd_asset.content_section[0].cons_news[0].related_links_text[0].embeded_module[0].$.style;
        //  var relatedlinksType = result.wbmd_asset.content_section[0].cons_news[0].related_links_text[0].embeded_module[0].$.type;                                             
        var relatedlinksbulletTitle = result.wbmd_asset.content_section[0].cons_news[0].related_links_text[0].embeded_module[0].bulletlist[0].bulletitem[0].btitle[0];
        var relatedlinksbulletDescription = result.wbmd_asset.content_section[0].cons_news[0].related_links_text[0].embeded_module[0].bulletlist[0].bulletitem[0].description[0].p[0];

        expect(expectedAlignment).to.equal(relatedlinksalignment);
        expect(expectedclass).to.equal(relatedlinksClass);
        expect(expectedmoduleTitle).to.equal(relatedlinksTitle);
        expect(expectedmoduleDescription).to.equal(relatedlinksDescription);
        expect(expectedstyle).to.equal(relatedlinksstyle);
        //   expect(expectedtype).to.equal(relatedlinksType);
        expect(expectedbullettitle).to.equal(relatedlinksbulletTitle);
        expect(expectedbulletdescription).to.equal(relatedlinksbulletDescription);
      }));
  });
});