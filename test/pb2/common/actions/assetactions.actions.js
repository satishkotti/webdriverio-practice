var acts = require('./../elements/actions.page');

module.exports.SelectMoreActions = (action) => 
{
    acts.button.get('More Actions').click();
    browser.pause(10000);
    
}

module.exports.ClickContinueButton = () =>
{
    acts.button.get('Continue').click();
<<<<<<< HEAD
}

module.exports.ClickModalContinueButton = () =>

{
    acts.splbutton.get('Continue').click();
=======
>>>>>>> 02aa792cb553da063878b037d5c1787c0272f85f
}