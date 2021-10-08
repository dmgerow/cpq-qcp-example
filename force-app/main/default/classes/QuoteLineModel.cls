global with sharing class QuoteLineModel {
    global SBQQ__QuoteLine__c record;
    global Boolean amountDiscountProrated;
    global Integer parentGroupKey;
    global Integer parentItemKey;
    global Integer key;
    global Boolean upliftable;
    global String configurationType;
    global String configurationEvent;
    global Boolean reconfigurationDisabled;
    global Boolean descriptionLocked;
    global Boolean productQuantityEditable;
    global Decimal productQuantityScale;
    global String dimensionType;
    global Boolean productHasDimensions;
    global Decimal targetCustomerAmount;
    global Decimal targetCustomerTotal;
}
