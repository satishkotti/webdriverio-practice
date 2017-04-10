var test = require('./../../../../common/functions/functions');
var smTestData = require('./../../../../data/sm.assets');

describe('XML validations for SponsorBox Module With All Fields', () => {
    var xml1 = {}; //pb1 xml
    var xml2 = {}; //pb2 xml
    var body_copiesCount = 0;
    var lower_linksCount = 0;

    before(() => {
        //xml1 = test.GetXMLValues('Navigation Module', test.GetXML('091e9c5e815a1964', 'live','FILE'));
        xml1 = test.GetXMLValues('Navigation Module', test.GetXML('\\test\\pb2\\data\\SampleData\\NavigationModule\\pb1.xml', 'live','FILE'));

        for (var property in xml1) {
            if (property.toString().startsWith('body_copy_body_copy_text_')) {
                body_copiesCount = body_copiesCount + 1;
            }
            if (property.toString().startsWith('lower_link_lower_link_lower_link_text_')) {
                lower_linksCount = lower_linksCount + 1;
            }
        }

    });

    //module settings assertions
    it('Verify Module Settings chronic_id exits or not in pb1 xml', () => {
        expect(xml1['chronic_id']).to.be.true;
    });
});

    