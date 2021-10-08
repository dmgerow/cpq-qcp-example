global with sharing class QuoteModel {
    global SBQQ__Quote__c record { get; set; }
    global QuoteLineModel[] lineItems { get; set; }
    global QuoteLineGroupModel[] lineItemGroups { get; set; }
    global Integer nextKey;
    global Boolean applyAdditionalDiscountLast;
    global Boolean applyPartnerDiscountFirst;
    global Boolean channelDiscountsOffList;
    global Decimal customerTotal;
    global Decimal netTotal;
    global Decimal netNonSegmentTotal;
}
