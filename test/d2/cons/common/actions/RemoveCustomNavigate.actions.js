
var newRCustomNavigate = require('./../ui/RemoveCustomNavigate');

module.exports = {
   
    VerifyfolderNavgte: function(Verifyfolderpath){
         
         var folerPathArr = Verifyfolderpath.split('/');
         
        
         do {
                if(folerPathArr && folerPathArr.length > 0)
                {
                    var foldergettexval= newRCustomNavigate.GetfolderText(folerPathArr[0]);
                    console.log(foldergettexval);
                    expect(folerPathArr[0]).to.equal(foldergettexval);
                    folerPathArr.shift();
                    
                }
            } while(folerPathArr && folerPathArr.length > 0)
       
    },

    logoutWindow: function(){
        newRCustomNavigate.logoutWindow();
    }


    
}

