var functions = require('./../../../common/functions/functions');
var login = require('./../../../common/actions/login.actions');
var contentTab = require('./../../../common/actions/contentTab.actions');
var findTab = require('./../../../common/actions/findTab.actions');
var dqlEditorTab = require('./../../../common/actions/dqlEditor.actions');
var propertiesTab = require('./../../../common/actions/propertiesTab.actions');

describe('Article properties with 16 zeroes should not result in validation error PPE-132066', function () {
    before(function () {
        login.loginWithNewWindow({
            url: functions.getEnvTestUrl(),
            username: functions.getQAPublicationUser().username,
            password: functions.getQAPublicationUser().password
        });
    });

    it('Article properties with 16 zeroes should not result in validation error PPE-132066', function () {
        dqlEditorTab.dqlEditorWidget();
        var id = dqlEditorTab.dqlQueryExecution("Select i_chronicle_id from wbmd_cons_article a, dm_dbo.wbmd_sqlrt_url u where a.a_is_template = FALSE and not ANY a.r_version_label = 'Expired' AND a.i_chronicle_id = content_chronic_id AND u.source in ('LIVE') AND u.site_id = '3' and a.wbmd_publ not in ('091e9c5e8079fe15', '091e9c5e80bfe13f', '091e9c5e80c14117', '091e9c5e80c0a6b5', '091e9c5e80c0b102', '091e9c5e80c0b103', '091e9c5e80cd4692') and (any wbmd_authr_prim = '0000000000000000' OR any wbmd_c_sec_authr= '0000000000000000')')");
        findTab.findByChronicleId(id);
        browser.pause(5000);
        propertiesTab.propertiessave();
        browser.pause(5000);
        contentTab.checkOut();
        contentTab.checkIn();
    });

});

