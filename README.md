# CMS Testing

## Prerequisites for development
* Java 1.6+
* Node 4.4(http://www.nodejs.org/)
* Set Up ssh keys for stash (https://confluence.atlassian.com/display/STASH034/Creating+SSH+keys). Verify access to repo by using clone/checkout from command line.

## Building
Open terminal window and navigate to "project" folder.
* Install build dependencies with `npm install`

### Running TestCoverage
To run tests run `npm run test`

### Writing tests
Mocha is used as test runner. Chai is used as assertion library.
Tests are located under /test/{app}/ folder.

