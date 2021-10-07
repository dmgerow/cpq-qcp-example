/**
 * This is an example unit test that you will need to modify to actually test your QCP files
 *
 * To get started:
 *  - Ensure you have a valid QCP file in the SRC directory that works
 *  - Ensure you have node installed
 *  - Run `npm install` from the root directory to install dependencies
 *  - Run the command: "SFDC QCP: Fetch record data from Salesforce and save locally"
 *    - Enter a valid QuoteId
 *    - Choose a valid filename for the output (defaults to quoteId)
 *  - Uncomment the code below
 *  - Replace the file path for the quoteModel that you saved in the previous step
 *  - Replace the file path to your QCP file if it differs from the example
 *  - If JSForce is required, then you will need to include your credentials in the `.env` file
 *  - update the unit tests as needed
 *  - run `npm test` from the command line to run your tests. Optionally, create a VSCode configuration to run the tests.
 */

/*
EXAMPLE:

Assumes a QCP script named QCP.ts
Assumes .env is configured
Assumes a downloaded record to /data/a1j50000006gHK7AAM.json
Assumes a custom quote field named Num_Accounts__c

### /src/QCP.ts ###

export function onBeforeCalculate(quoteModel, quoteLineModels, conn) {
  return new Promise((resolve, reject) => {
    console.log('onBeforeCalculate()');
    getAccountCount(conn)
      .then(numAccounts => {
        console.log('numAccounts: ', numAccounts);
        quoteModel.record.Num_Accounts__c = numAccounts;
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  });
}

function getAccountCount(conn) {
  return new Promise((resolve, reject) => {
    conn
      .query('SELECT count() FROM Account')
      .then(numAccountsResults => {
        resolve(numAccountsResults.totalSize);
      })
      .catch(err => {
        console.log('Error querying accounts', err);
        resolve();
      });
  });
}

### This file ###

import { expect } from 'chai';
import * as quoteModel from '../data/a1j50000006gHK7AAM.json';
import * as qcp from '../src/QCP';
import { getConn } from './init-jsforce';

async function initJsforceConn() {
  return await getConn();
}

describe('QCP Test', () => {
  it('Should successfully call onBeforeCalculate()', async () => {
    const conn = await initJsforceConn();
    await qcp.onBeforeCalculate(quoteModel, quoteModel.lineItems, conn);
    const totalSize = (await conn.query('SELECT count() FROM Account')).totalSize;
    expect(quoteModel.record.Num_Accounts__c).to.equal(totalSize);
  });
});

*/

//////// Stock Unit Test ///////////

// import { expect } from 'chai';
// import * as quoteModel from '../data/a1j50000006gHK7AAM.json';
// import * as qcp from '../src/QCP';
// import { getConn } from './init-jsforce.js';

/**
 * Call this if you need to pass `conn` to any of your QCP methods
 * If used, ensure you have configured your `.env` file
 */
// async function initJsforceConn() {
//   return await getConn();
// }

// describe('QCP Test', () => {
//   // TODO: implement unit tests for your QCP record

//   it('Should successfully call onInit()', async () => {
//     await qcp.onInit(quoteModel.lineItems);
//     expect(true).to.equal(true);
//   });

//   it('Should successfully call onBeforeCalculate()', async () => {
//     await qcp.onBeforeCalculate(quoteModel, quoteModel.lineItems);
//     expect(true).to.equal(true);
//   });

//   it('Should successfully call onBeforePriceRules()', async () => {
//     await qcp.onBeforePriceRules(quoteModel, quoteModel.lineItems);
//     expect(true).to.equal(true);
//   });

//   it('Should successfully call onAfterPriceRules()', async () => {
//     await qcp.onAfterPriceRules(quoteModel, quoteModel.lineItems);
//     expect(true).to.equal(true);
//   });

//   it('Should successfully call onAfterCalculate()', async () => {
//     await qcp.onAfterCalculate(quoteModel, quoteModel.lineItems);
//     expect(true).to.equal(true);
//   });
// });
