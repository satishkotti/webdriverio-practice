var labelUI = require('./../ui/label');

var labelObj = {
    togglemenu:function(){
        labelUI.togglemenu();
    },
    questionTitleLabel: function () {
        labelUI.questionTitleLabel();
    },
    answerTitleLabel: function(){
        labelUI.answerTitleLabel();
    },
    answerLabel: function () {
        labelUI.answerLabel();
    },
    questionLabel: function () {
        labelUI.questionLabel();
    },
    resultTitleLabel: function(){
        labelUI.resultTitleLabel();
    },
    resultLabel: function(){
        labelUI.resultLabel();
    },
    sectionTitleLabel: function(){
        labelUI.sectionTitleLabel();
    },
    sectionLabel: function(){
        labelUI.sectionLabel();
    },
    faqquestionLabel: function(){
        labelUI.faqquestionLabel();
    },
    faqanswerLabel: function(){
        labelUI.faqanswerLabel();
    },
    switchParentFrame: function(){
        labelUI.switchParentFrame();
    },
    refresh: function(){
        labelUI.refresh();
    }
}

module.exports = labelObj;