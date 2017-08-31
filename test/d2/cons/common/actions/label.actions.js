var labelUI = require('./../ui/label');

var labelObj = {
    togglemenu:function(){
        labelUI.togglemenu();
    },
    questionTitleLabel: function () {
        labelUI.questionTitleLabel();
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
    switchParentFrame: function(){
        labelUI.switchParentFrame();
    }
}

module.exports = labelObj;