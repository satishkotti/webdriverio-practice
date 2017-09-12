var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var input = require('./../../config/PPE-107645-Testdata')[argv.env];
var ap = require('./../../common/functions/PPE-107645.actions');
var url = input.environment;
console.log("Url: " + url);

describe('PPE-107645 - Mobile Quizzes - Answer Page Update', function () {
        it('Verify that on all answer pages any text longer than three lines should be hidden', function () {
                browser.url(url);
                //browser.pause(15000);
                ap.True();
                browser.pause(5000);
                //console.log(ap.GetLineAttribute('line-height'));
                var lineheight = parseInt(ap.GetLineAttribute('line-height').parsed.value);
                var _3linesheight = parseInt(ap.GetLineAttribute('height').parsed.value);
                expect(lineheight * 3).to.equal(_3linesheight);
        })

        it('Verify that read more link is present at the end of the third line', function () {
               //expect(ap.ReadMore().isVisible()).to.be.true;
                var readmorelinkposition = parseInt(commonelements.Readmore.getLocation().y);
                var textstartposition = parseInt(commonelements.line.getLocation().y);
                // console.log(readmorelinkposition);
                // console.log(textstartposition);
                var difference = readmorelinkposition - textstartposition;
                expect(difference >= 60 && difference < 80).to.be.true;
        })

        it('Verify that hidden text is displayed when clicked on read more', function(){
                var answerinitialsize = parseInt(ap.GetAnswerCssProperty('height').parsed.value);
                commonelements.Readmore.click();
                browser.pause(6000);
                //expect(ap.ReadMore().isVisible()).to.be.false;
                var answerfinalsize = parseInt(ap.GetAnswerCssProperty('height').parsed.value);
                expect(answerinitialsize < answerfinalsize).to.be.true;
        })

           it('Verify that "Show Question" link is displayed next to the question counter', function(){
                expect(ap.ShowQuestion().isVisible()).to.be.true;
                
        })

        it('Verify that Sources and Medically Reviewed links are appeared after the third line and followed by the ad', function(){
                expect(ap.Sources().isVisible()).to.be.true;
                expect(ap.MedicallyReviewed().isVisible()).to.be.true;
        })

        it('Verify that in the answer page the question text is collapsed', function(){
                expect(ap.ShowQuestion().isVisible()).to.be.true
                //var questioninitialstatus = ap.GetAnswerCssProperty('display');
                  //      commonelements.Showquestion.click();
                    //    browser.pause(5000);
                //var questionfinalstatus = ap.GetAnswerCssProperty('display');
                //expect(questioninitialstatus == 'none' && questionfinalstatus == 'block' ).to.be.true;
                
        })

        it('Verify that, when clicked on the "Show Question" link, the collapsed text is displayed', function(){
                commonelements.Showquestion.click();
                browser.pause(5000);
                expect(ap.ShowQuestion().isVisible()).to.be.false;
        })
});