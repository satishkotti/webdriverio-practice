
var newRCustomNavigate = require('./../ui/RemoveCustomNavigate');

module.exports = {
   
    VerifyfolderNavgte: function(folderpath){
       
         var folerPathArr = folderPath.split('/');
        
         do {
                if(folerPathArr && folerPathArr.length > 0)
                {
                    var foldergettexval= newRCustomNavigate.GetfolderText(folerPathArr[0]);
                    expect(folerPathArr[0]).to.equal(foldergettexval);
                    folerPathArr.shift();
                    
                }
            } while(folerPathArr && folerPathArr.length > 0)
       
    }
}

