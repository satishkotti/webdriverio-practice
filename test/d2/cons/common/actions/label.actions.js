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
}

module.exports = labelObj;