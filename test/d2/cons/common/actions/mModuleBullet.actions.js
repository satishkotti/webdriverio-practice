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
    addHeadlineDescrAlignBullet: function (headline, description, align, bullets) {
        mModuleBulletListUI.setModuleHeadline(headline);
        mModuleBulletListUI.setModuleDescription(description);
        mModuleBulletListUI.setAlign(align);
        
        bullets.forEach( function (bullet)
        {
            mModuleBulletListUI.setInsertBulletTitle(bullet.title);
            mModuleBulletListUI.setInsertBulletDescription(bullet.description)
        });
        mModuleBulletListObj.verifyLabels();
        mModuleBulletListObj.verifyData(headline, description, align, bullets);
    },
    updateCodeAndTypeCancel: function (headline, description, align, bullets) {
        mModuleBulletListUI.setModuleHeadline(headline);
        mModuleBulletListUI.setModuleDescription(description);
        mModuleBulletListUI.setAlign(align);
        
        //for each bullet add bullet info
        bullets.forEach( function (bullet)
        {
            mModuleBulletListUI.setInsertBulletTitle(bullet.title);
            mModuleBulletListUI.setInsertBulletDescription(bullet.description)
        });
        mModuleBulletListObj.verifyLabels();
        mModuleBulletListObj.verifyData(headline, description, align, bullets);
    },
    verifyLabels: function () {
       var moduleHeadline = mModuleBulletListUI.getModuleHeadlineLabel();
       var moduleHeadline = mModuleBulletListUI.getModuleDescriptionLabel();
       var align = mModuleBulletListUI.getAlignLabel();
       var bullets= mModuleBulletListUI.getBulletsLabel();
       var insertBulletTitle = mModuleBulletListUI.getInsertBulletTitleLabel();
       var insertBulletDesc = mModuleBulletListUI.getInsertBulletDescriptionLabel();
       var bulletsTblTitle =  mModuleBulletListUI.getBulletsTableTitle();
       
        expect(moduleHeadline).to.equal('Module Headline');
        expect(moduleHeadline).to.equal('Module Description');
        expect(align).to.equal('Align');
        expect(bullets).to.equal('Bullets');
        expect(insertBulletTitle).to.equal('Insert Bullet Title');
        expect(insertBulletDesc).to.equal('Insert Bullet Description');
        expect(bulletsTblTitle).to.equal('Title');
    },
    verifyData: function (headline, description, align, bullets) {
        
        var headline = mModuleBulletListUI.getModuleHeadline();
        var description = mModuleBulletListUI.getModuleDescription();
        var align = mModuleBulletListUI.getAlign();
        var bulletsAdded = mModuleBulletListUI.getBullets();

        expect(headline).to.equal(headline);
        expect(description).to.equal(description);
        expect(align.toLowercase()).to.equal(align);
        
         bulletsAdded.forEach( function (bullet)
        {
            //find bullet from list if not found then throw error
            var itemIndex = bullets.indexOf(bullet.title);
            if(itemIndex < 0)
                assert.fail(0,1,'Fail to find bullet title:' + bullet.title);
            
            expect(bullets[itemIndex].description).to.equal(bullet.description)

        });
    }
}

module.exports = mModuleCodeObj;