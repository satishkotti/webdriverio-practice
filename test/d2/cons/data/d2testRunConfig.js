var randomstring = require("randomstring");
var randomtext = randomstring.generate(5);

module.exports.testData={
    url: "http://d2.dev04.webmd.com/D2/#d2",
    username: "QAPublication",
    password: "QA-Doc#1",
    
};


module.exports.inputData=
{
   // rotpath: "webmd::2/consumer_assets::3/editorial::4/articles::5/other::6/test::7",
    rotpath:"webmd::2/consumer_assets::3/editorial::4",
  
    rootnode: "webmddoc01",
    articletitle :"QATestAsset"+randomtext,
    //'QANewsArtcle4444',
    Articleprofilename: 'Consumer Portal US / Article Templates',
    ArticledescrName :'Article /  News Template',

    articleeditdescr: "QATestAsset"+randomtext,
    //'QANews4444',
    webmdcpyrights:'2015 WebMD',
    //objectTitle: "QATestAsset"+randomtext,
    objectTitle:"QAArticleNews",
    
    articleContentFields: "Section Text,Highlights,Pull Quotes,Citations,Related Links Text"
};

module.exports.expectedResults={
    bulletlist: "Bulleted List"
};