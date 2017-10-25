var SnippetswidgetTabUI = require('./../ui/SnippetswidgetTab');


var SnippetswidgetTabUIObj = {

    selectversions: function () {
        SnippetswidgetTabUI.SnippetWidgetSelection();
        SnippetswidgetTabUI.SwitchToRelatedWidgetFrame();
    },
   
   SelectSnippetAsset: function () {

      
       SnippetswidgetTabUI.SelectSnippetAsset();
        

    },

    ValidateRelatedContedheaders:function () {

      
       SnippetswidgetTabUI.ValidateRelatedContedheaders();
      

    },
    Verifyrelatedassetdata: function(query){
        SnippetswidgetTabUI.Verifyrelatedassetdata(query);
    }
}

module.exports = SnippetswidgetTabUIObj;