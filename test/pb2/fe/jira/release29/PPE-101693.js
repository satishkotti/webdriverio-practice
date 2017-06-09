var assert = require('assert');
const Promise = require('bluebird');
var fs = require('fs'),
    path = require('path'),
    _ = require('underscore');

var test = require('./../../../common/functions/functions');
var redirectActions = require("./../../../common/actions/redirecttool.actions");
var browserDownloadPath = global.browserDownloadPath;

function getLine(filename, line_no, callback) {
    var stream = fs.createReadStream(filename, {
        flags: 'r',
        encoding: 'utf-8',
        fd: null,
        mode: 0666,
        bufferSize: 64 * 1024
    });

    var fileData = '';
    stream.on('data', function(data) {
        fileData += data;

        // The next lines should be improved
        var lines = fileData.split("\n");

        if (lines.length >= +line_no) {
            stream.destroy();
            callback(null, lines[+line_no]);
        }
    });

    stream.on('error', function() {
        callback('Error', null);
    });

    stream.on('end', function() {
        callback('File end reached without finding line', null);
    });

}

var rmDir = function(dirPath, removeSelf) {
    if (removeSelf === undefined)
        removeSelf = true;
    try { var files = fs.readdirSync(dirPath); } catch (e) { return; }
    if (files.length > 0)
        for (var i = 0; i < files.length; i++) {
            var filePath = dirPath + '/' + files[i];
            if (fs.statSync(filePath).isFile())
                fs.unlinkSync(filePath);
            else
                rmDir(filePath);
        }
    if (removeSelf)
        fs.rmdirSync(dirPath);
};

var readFolder = function(folder) {
    return new Promise(function(resolve, reject) {
        fs.readdir(folder, function(err, files) {
            if (err) reject(err);
            else resolve(files);
        });
    });
}

describe('PPE-101693: Ability to Export all Redirects', function() {
    var csvFiles = null;
    var randomeSite = null;
    before(() => {
        //Launch App
        test.LaunchAppAndLogin();

        //cleanup the download folder
        rmDir(browserDownloadPath, false);
        browser.pause(2000);
    });

    it('Go to Redirect Tool Page', function() {
        redirectActions.GoToRedirectToolPage();
    });

    it('Export redircet file', function() {
        browser.selectByValue("span.pb-buttongroup.floatright > select", 3);
        browser.waitForVisible("section.pb-notification-container.success");

        return Promise.resolve(
            readFolder(browserDownloadPath).then(function(files) {
                csvFiles = files;
            }));
    });
    var fileHeader = "";
    it("Verify that the file exists in the download folder", function() {
        assert.equal(csvFiles.length, 1);
    });
    var filelines = null;
    it("Verify that the file has the correct header", function() {

        filelines = fs.readFileSync(browserDownloadPath + "\\" + csvFiles[0]).toString().split('\n');
        var header = filelines[0].split(',');

        assert.equal(header.length, 9);
        assert.equal(header[0], "From Page Chron ID");
        assert.equal(header[1], "From Page Status");
        assert.equal(header[2], "From Url");
        assert.equal(header[3], "From Url 2");
        assert.equal(header[4], "To Chron ID");
        assert.equal(header[5], "To Page Status");
        assert.equal(header[6], "To Url");
        assert.equal(header[7], "Modified By");
        assert.equal(header[8].trim("\r"), "Modifed Date");
        browser.pause(2000);
    });

    it("Verify that the file has some data", function() {
        assert.equal(filelines.length > 1, true);
    });
});