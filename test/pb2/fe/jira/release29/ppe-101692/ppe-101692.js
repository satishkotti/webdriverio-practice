const test = require('./../../../../common/functions/functions.js');
const testdata = require('./../../../../data/testdata/ppe-101692.testdata');
const moment = require('moment');

describe('PPE-101692: Verify the ability to Export Redirect Search Results', () => {


    var currentdate = moment().format('MM-DD-YYYY');
    var fileExportDirectory = `${global.browserDownloadPath}\\`;
    var exportedFile = `${global.browserDownloadPath}\\Redirect_Tools_Results_${currentdate}.xlsx`;

    before(() => {
        
        //Delete all files from the NAS Share with name Redirect_Tools_Results_MM-DD-YYYY.xlsx
        test.DeleteAllFilesIn(fileExportDirectory, `Redirect_Tools_Results_${currentdate}.xlsx`);

        //Launch app and login
        test.LaunchAppAndLogin();

        //Naviagte to Redirect Tool page
        test.NavigateToRedirectToolPage();

        //Perfrom search operation
        test.SearchForRedirects({
            from: testdata.from,
            to: null
        });

    });

    it('PPE-115471: Verify that Search Results are exported into an excel file and downloaded locally when "Export to Excel" button / icon is clicked', () => {

        //Click Export to Excel button
        browser.pause(2000);
        test.ExportRedirectSearchResultsToExcelFile();

        //Verify whether file is downloaded to local storage and is of type .xls or .xlsx
        let count = 0;
        let exportedFileExists = false;

        do {
            exportedFileExists = test.VerifyFileExistence(exportedFile);
            browser.pause(5000);
            count++;
        } while (count < 120 && !exportedFileExists);

        expect(exportedFileExists).to.be.true;

    });

    after(() => {

        //Delete the downloaded file
        let count = 0;
        let exportedFileExists = true;
        do {
            test.DeleteFile(exportedFile);
            exportedFileExists = test.VerifyFileExistence(exportedFile);
            browser.pause(5000);
            count++;
        } while (count < 120 && exportedFileExists);

    });

});