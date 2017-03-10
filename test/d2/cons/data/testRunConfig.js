// Input parameters


module.exports.testData={
   url: 'http://d2.dev04.webmd.com/D2/#d2',
  // url: 'http://d2.qa01.webmd.com/D2/#d2',
    username: "QAPublication",
     password: "QA-Doc#1",
     path:"webmd::2/consumer_assets::3/editorial::4",
    articleContentFields: "Section Text,Highlights,Pull Quotes,Citations,Related Links Text"

};


module.exports.expectedResults={
    bulletlist: "Bulleted List"
};