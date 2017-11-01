var versionTabUI = require('./../ui/versionTab');

module.exports = {

    selectversions: function (assetName, assetVersion1, assetVersion2) {
        versionTabUI.selectversions(assetName, assetVersion1, assetVersion2);
    },
    versionValidation: function(){
        versionTabUI.versionValidation();
    },
     approvedversionValidation: function(){
        versionTabUI.approvedversionValidation();
    },
    activeversionValidation: function(){
        versionTabUI.activeversionValidation();
    },
    expireversionValidation: function(){
        versionTabUI.expireversionValidation();
    },

    WipversionValidation: function(){
        versionTabUI.WipversionValidation();
    },

    WipStagingversionValidation:  function(){
        versionTabUI.WipStagingversionValidation();
    },

    PowerpromoteversionValidation: function(){
        versionTabUI.PowerpromoteversionValidation();
    },
    
    
    CancelchekoutcversionValidation: function(){
        versionTabUI.CancelchekoutcversionValidation();
    },

    CancelchekoutStaginglableValidation: function(){
        versionTabUI.StaginglableValidation();
    },
    
}