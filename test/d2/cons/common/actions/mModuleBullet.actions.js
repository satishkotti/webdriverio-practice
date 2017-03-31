var mModuleBulletListUI = require('./../ui/mModuleBulletList');


var mModuleBulletListObj = {
    getHeadlineDescAlignBullets: function () {
        return info= {
            headline: mModuleBulletListUI.getModuleHeadline(),
            description: mModuleBulletListUI.getModuleDescription(),
            align: mModuleBulletListUI.getAlign(),
            bullets: mModuleBulletListUI.getBullets()
        };
    },
    addHeadlineDescrAlignBullet: function (headline, description, align, title,bulletdescription) {
        mModuleBulletListUI.setModuleHeadline(headline);
        mModuleBulletListUI.setModuleDescription(description);
        mModuleBulletListUI.setAlign(align);
     
            mModuleBulletListUI.setInsertBulletTitle(title);
            mModuleBulletListUI.setInsertBulletDescription(description);
      
        mModuleBulletListObj.verifyLabels();

        mModuleBulletListUI.insertBulletDescriptionValueSet();
        mModuleBulletListUI.insert();
        mModuleBulletListUI.insertModuleValidation(headline)
        //contentTab.contenttabframeswitching();
        //expect(headline).to.equal(browser.getText("(//figcaption[@class='embedModuleClickable' and contains(.,'"+headline+"')])"));

       // mModuleBulletListObj.verifyData(headline, description, align, title,bulletdescription);
    },

    multiplebulletlist: function(headline, description, align, title,title2){
             mModuleBulletListUI.setModuleHeadline(headline);
        mModuleBulletListUI.setModuleDescription(description);
        mModuleBulletListUI.setAlign(align); 
            mModuleBulletListUI.setInsertBulletTitle(title);
            mModuleBulletListUI.setInsertBulletDescription();
            mModuleBulletListUI.insertBulletDescriptionValueSet();
            mModuleBulletListUI.setInsertBulletTitle(title2);
            mModuleBulletListUI.setInsertBulletDescription();
            mModuleBulletListUI.insertBulletDescriptionValueSet();
            mModuleBulletListUI.insert();
             mModuleBulletListUI.insertModuleValidation(headline)

    },

bulletlistEdit: function(headline, description, align,title,updatedbulletTitle){
       mModuleBulletListUI.setModuleHeadline(headline);
        mModuleBulletListUI.setModuleDescription(description);
        mModuleBulletListUI.setAlign(align); 
        mModuleBulletListUI.setInsertBulletTitle(title);
            mModuleBulletListUI.setInsertBulletDescription();
            mModuleBulletListUI.insertBulletDescriptionValueSet();
            mModuleBulletListUI.bulletEdit(updatedbulletTitle);
             mModuleBulletListUI.insert();
             mModuleBulletListUI.insertModuleValidation(headline);

},


bulletlistTitleEdit: function(headline,updatedheadline){
    mModuleBulletListUI.bulletTitleEdit(headline,updatedheadline);
     mModuleBulletListUI.insertModuleValidation(updatedheadline);


},

    updateCodeAndTypeCancel: function (headline, description, align, title,bulletdescription) {
        mModuleBulletListUI.setModuleHeadline(headline);
        mModuleBulletListUI.setModuleDescription(description);
        mModuleBulletListUI.setAlign(align);

        

       
        // //for each bullet add bullet info
        // bullets.forEach( function (bullet)
        // {
        //     mModuleBulletListUI.setInsertBulletTitle(bullet.title);
        //     mModuleBulletListUI.setInsertBulletDescription(bullet.description)
        // });

          mModuleBulletListUI.setInsertBulletTitle(title);
            mModuleBulletListUI.setInsertBulletDescription(description)
      
        mModuleBulletListObj.verifyLabels();
       mModuleBulletListObj.verifyData(headline, description, align, title,bulletdescription);

        mModuleBulletListObj.cancel();
    },
    verifyLabels: function () {
       var moduleHeadline = mModuleBulletListUI.getModuleHeadlineLabel();
       var moduleDescription = mModuleBulletListUI.getModuleDescriptionLabel();
       var align = mModuleBulletListUI.getAlignLabel();
       var bullets= mModuleBulletListUI.getBulletsLabel();
       var insertBulletTitle = mModuleBulletListUI.getInsertBulletTitleLabel();
       var insertBulletDesc = mModuleBulletListUI.getInsertBulletDescriptionLabel();

       
        expect(moduleHeadline).to.equal('Module Headline');
        expect(moduleDescription).to.equal('Module Description');
        expect(align).to.equal('Align');
        expect(bullets).to.equal('Bullets');
        expect(insertBulletTitle).to.equal('Insert Bullet Title');
        expect(insertBulletDesc).to.equal('Insert Bullet Description');
        
    },
    verifyData: function (headline, description, align, title,bulletdescription) {
        
        var moduleheadline = mModuleBulletListUI.getModuleHeadline();
        var moduledescription = mModuleBulletListUI.getModuleDescription();
        var align = mModuleBulletListUI.getAlign();
      //  var bulletsAdded = mModuleBulletListUI.getBullets();
        var bullettitle= mModuleBulletListUI.getInsertBulletTitle();
        var bulletdesc= mModuleBulletListUI.getInsertBulletDescription();


        expect(moduleheadline).to.equal(headline);
        expect(moduledescription).to.equal(description);
        expect(align.toLowercase()).to.equal(align);
        expect(bullettitle).to.equal(title);
        expect(bulletdesc).to.equal("D2");


        
        //  bulletsAdded.forEach( function (bullet)
        // {
        //     //find bullet from list if not found then throw error
        //     var itemIndex = bullets.indexOf(bullet.title);
        //     if(itemIndex < 0)
        //         assert.fail(0,1,'Fail to find bullet title:' + bullet.title);
            
        //     expect(bullets[itemIndex].description).to.equal(bullet.description)

        // });
        //expect(bullets[itemIndex].description).to.equal(bullet.description)
   },
     RepositoryRefresh: function()
    {

        mModuleBulletListUI.RepositoryRefresh();
    }


 
    


}

module.exports = mModuleBulletListObj;