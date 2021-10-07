/*
 * This is a sample plugin for use in the new JavaScript Quote Calculator. It exports all of the methods that
 * the calculator will look for, and documents their parameters and return types.
 *
 * These methods are all optional. One may export any, all, or none of them in order to achieve the desired behavior.
 *
 * Note that the plugin is an ES6 module. It is transpiled via Babel, and thus it is module-scoped by default. One may
 * use any elements of the ES6 language or syntax. However, the plugin must be able to run in both Browser and Node
 * environments. This means that one cannot expect browser global variables such as window to be available.
 *
 * QCP: https://developer.salesforce.com/docs/atlas.en-us.cpq_dev_plugins.meta/cpq_dev_plugins/cpq_plugins_parent.htm
 * PSP: https://developer.salesforce.com/docs/atlas.en-us.cpq_dev_plugins.meta/cpq_dev_plugins/cpq_page_security_plugin.htm
 * Template based on: paustint.sfdc-qcp-vscode-extension
 */

// Control if debugs are printed to the console or not
const DEBUG = true;

// ********************* Begin Page Security Plugin ********************//
export function isFieldVisible(fieldName, line) {
  // make list price read only at the bundle parent level
  if (fieldName === "SBQQ__ListPrice__c" && line.SBQQ__Bundle__c === true) {
    return line.Security_Level__c !== "Hidden";
  }
  // Return null to ignore checking visibility for this specific field
  return null;
}

export function isFieldEditable(fieldName, line) {
  // make quantity read only at the bundle parent level
  if (fieldName === "SBQQ__Quantity__c" && line.SBQQ__Bundle__c === true) {
    return false;
  }
  return null;
}
// ********************* End Page Security Plugin ********************//

// ********************* Begin Quote Calculator Plugin ********************//
/**
 * This method is called by the calculator when the plugin is initialized.
 * @param {QuoteLineModel[]} quoteLineModels An array containing JS representations of all lines in a quote
 * @returns {Promise}
 */
export function onInit(quoteLineModels, conn) {
  return new Promise((resolve, reject) => {
    // Perform logic here and resolve promise
    resolve("success");
  });
}

/**
 * This method is called by the calculator before calculation begins, but after formula fields have been evaluated.
 * @param {QuoteModel} quoteModel JS representation of the quote being evaluated
 * @param {QuoteLineModel[]} quoteLineModels An array containing JS representations of all lines in the quote
 * @returns {Promise}
 */
export function onBeforeCalculate(quoteModel, quoteLineModels, conn) {
  return new Promise((resolve, reject) => {
    conn.apex
      .post(
        "/cpq/pricing",
        JSON.stringify(
          getRecordsFromModelsWithoutRelationships(quoteLineModels)
        )
      )
      .then((response) => {
        resolve("success");
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}

/**
 * This method is called by the calculator before price rules are evaluated.
 * @param {QuoteModel} quoteModel JS representation of the quote being evaluated
 * @param {QuoteLineModel[]} quoteLineModels An array containing JS representations of all lines in the quote
 * @returns {Promise}
 */
export function onBeforePriceRules(quoteModel, quoteLineModels, conn) {
  return new Promise((resolve, reject) => {
    // Perform logic here and resolve promise
    resolve("success");
  });
}

/**
 * This method is called by the calculator after price rules are evaluated.
 * @param {QuoteModel} quoteModel JS representation of the quote being evaluated
 * @param {QuoteLineModel[]} quoteLineModels An array containing JS representations of all lines in the quote
 * @returns {Promise}
 */
export function onAfterPriceRules(quoteModel, quoteLineModels, conn) {
  return new Promise((resolve, reject) => {
    // Perform logic here and resolve promise
    resolve("success");
  });
}

/**
 * This method is called by the calculator after calculation has completed, but before formula fields are
 * re-evaluated.
 * @param {QuoteModel} quoteModel JS representation of the quote being evaluated
 * @param {QuoteLineModel[]} quoteLineModels An array containing JS representations of all lines in the quote
 * @returns {Promise}
 */
export function onAfterCalculate(quoteModel, quoteLineModels, conn) {
  return new Promise((resolve, reject) => {
    // Perform logic here and resolve promise
    resolve("success");
  });
}
// ********************* End Quote Calculator Plugin ********************//

// ********************* Begin Utilities ********************//
function logRecords(quoteOrLineModel) {
  // serializing records removes proxy to make debugging easier,
  // BUT is a performance hit, so make sure to disable logging in production to avoid this without code changes
  if (DEBUG) {
    const models = Array.isArray(quoteOrLineModel)
      ? quoteOrLineModel
      : [quoteOrLineModel];
    debug(JSON.parse(JSON.stringify(mapRecords(models))));
  }
}

function debug(...args) {
  if (DEBUG) {
    console.log(...args);
  }
}

// pulls the record property out of the models
function mapRecords(quoteLineModels) {
  return quoteLineModels.map((model) => model.record);
}

/**
 * Group all quote lines by very top level bundle
 * This is useful when you need to rollup values on a bundle by bundle basis
 */
function groupByTopLevelBundle(quoteLineModels) {
  const bundles = quoteLineModels.reduce((bundles, line) => {
    const parentKey = getParentKey(line);
    if (!bundles[parentKey]) {
      bundles[parentKey] = [];
    }
    bundles[parentKey].push(line);
    return bundles;
  }, {});

  debug("bundles", bundles);
  return bundles;
}

// recursively get parent key
function getParentKey(quoteLine) {
  if (quoteLine.parentItem) {
    return getParentKey(quoteLine.parentItem);
  } else {
    return quoteLine.key;
  }
}

// convert JS date to a date that can be interpreted by apex
function toApexDate(date) {
  if (date == null) {
    return null;
  }
  let dateIso = date.toISOString();
  return dateIso.replace(new RegExp("[Tt].*"), "");
}

// This is useful if you decide to send a serialized quote/quote line to the server and would like
// to deserialize it in apex. If you do not remove the relationships then the deserialization will
// fail. The relationship objects also use a lot of memory which can result in heap size exceptions
// being thrown during deserialization.
function getRecordsFromModelsWithoutRelationships(quoteOrLineModel) {
  const models = Array.isArray(quoteOrLineModel)
    ? quoteOrLineModel
    : [quoteOrLineModel];
  return models.map((model) => {
    let clonedRecord = Object.assign({}, model.record);
    for (let field in clonedRecord) {
      if (field.endsWith("__r")) {
        delete clonedRecord[field];
      }
    }
    return clonedRecord;
  });
}
// ********************* End Utilities ********************//
