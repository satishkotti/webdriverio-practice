
let page_64CharsLong = 'QAPage-0123456789-0123456789-0123456789-0123456789-0123456789-01';
let page_65CharsLong = 'QAPage-0123456789-0123456789-0123456789-0123456789-0123456789-012';
let page_66CharsLong = 'QAPage-0123456789-0123456789-0123456789-0123456789-0123456789-0123';

let template_64CharsLong = 'QATemplate-0123456789-0123456789-0123456789-0123456789-012345678';
let template_65CharsLong = 'QATemplate-0123456789-0123456789-0123456789-0123456789-0123456789';
let template_66CharsLong = 'QATemplate-0123456789-0123456789-0123456789-0123456789-0123456789-';

let sm_64CharsLong = 'QASM-0123456789-0123456789-0123456789-0123456789-0123456789-1234';
let sm_65CharsLong = 'QASM-0123456789-0123456789-0123456789-0123456789-0123456789-12345';
let sm_66CharsLong = 'QASM-0123456789-0123456789-0123456789-0123456789-0123456789-123456';

let pm_64CharsLong = 'QAPM-0123456789-0123456789-0123456789-0123456789-0123456789-0123';
let pm_65CharsLong = 'QAPM-0123456789-0123456789-0123456789-0123456789-0123456789-01234';
let pm_66CharsLong = 'QAPM-0123456789-0123456789-0123456789-0123456789-0123456789-012345';

let tm_64CharsLong = 'QATM-0123456789-0123456789-0123456789-0123456789-0123456789-0123';
let tm_65CharsLong = 'QATM-0123456789-0123456789-0123456789-0123456789-0123456789-01234';
let tm_66CharsLong = 'QATM-0123456789-0123456789-0123456789-0123456789-0123456789-012345';

const pageData = require("./../page.assets");
const templateData = require("./../template.assets");

module.exports.TestData = {

    ppe_124045:
    {
        "type": "standalone",
        "layout": "Responsive",
        "layoutCSS": "3 Column Responsive",
        _64CharsLong: page_64CharsLong,
        _65CharsLong: page_65CharsLong,
        _66CharsLong: page_66CharsLong

    },
    ppe_124047:
    {
        "type": "standalone",
        "layout": "Responsive",
        "layoutCSS": "3 Column Responsive",
        _64CharsLong: template_64CharsLong,
        _65CharsLong: template_65CharsLong,
        _66CharsLong: template_66CharsLong
    },
    ppe_124055:
    {
        _64CharsLong: sm_64CharsLong,
        _65CharsLong: sm_65CharsLong,
        _66CharsLong: sm_66CharsLong

    },
    ppe_124056:
    {
        _PageProps: pageData.normalStandalonePage,
        _64CharsLong: pm_64CharsLong,
        _65CharsLong: pm_65CharsLong,
        _66CharsLong: pm_66CharsLong

    },
    ppe_124057:
    {
        _TemplateProps: templateData.normalStandaloneTemplate,
        _64CharsLong: tm_64CharsLong,
        _65CharsLong: tm_65CharsLong,
        _66CharsLong: tm_66CharsLong

    }

}