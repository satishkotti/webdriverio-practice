(function() {
    module.exports = {
        get_Text: function(objElement) {
            try {
                return (objElement.getText());
            } catch (error) {
                console.log('Element with selector: ' + objElement.selector + ' is not displayed');
            }
        },
        is_Visible: function(objElement) {
            try {
                return (objElement.isVisible());
            } catch (error) {
                console.log('Element with selector: ' + objElement.selector + ' is not displayed');
            }
        },
        is_Existing: function(objElement) {
            try {
                return (objElement.isExisting());
            } catch (error) {
                console.log('Element with selector: ' + objElement.selector + ' is not Existing');
            }
        },
        elements: function(objElement) {
            try {
                return (objElement.elements());
            } catch (error) {
                console.log('Element with selector: ' + objElement.selector + ' is not Existing');
            }
        }
    }
})();