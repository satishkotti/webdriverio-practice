var SnippetswidgetTabUI = require('./../ui/SnippetswidgetTab');


var SnippetswidgetTabUIObj = {

    selectversions: function () {
        SnippetswidgetTabUI.SnippetWidgetSelection();
    },
   
   SelectSnippetAsset: function () {

      
       SnippetswidgetTabUI.SelectSnippetAsset();
     

    },

    ValidateRelatedContedheaders:function () {

       SnippetswidgetTabUI.SwitchToRelatedWidgetFrame();
       SnippetswidgetTabUI.ValidateRelatedContedheaders();
      

    },
    
}

module.exports = SnippetswidgetTabUIObj;