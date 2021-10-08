@isTest
private class CPQ_PricingService_Test {
    @IsTest
    static void calculatePrice() {
        SBQQ__Quote__c quote = new SBQQ__Quote__c();
        SBQQ__QuoteLine__c quoteLine = new SBQQ__QuoteLine__c();
        SBQQ__QuoteLineGroup__c quoteLineGroup = new SBQQ__QuoteLineGroup__c();
        QuoteModel quoteModel = new QuoteModel();
        quoteModel.record = quote;
        QuoteLineModel quoteLineModel = new QuoteLineModel();
        quoteLineModel.record = quoteLine;
        quoteModel.lineItems = new List<QuoteLineModel>{ quoteLineModel };
        QuoteLineGroupModel groupModel = new QuoteLineGroupModel();
        groupModel.record = quoteLineGroup;
        quoteModel.lineItemGroups = new List<QuoteLineGroupModel>{ groupModel };
        Test.startTest();
        QuoteModel updatedModel = CPQ_PricingService.calculatePrice(quoteModel);
        Test.stopTest();
        System.assert(
            updatedModel.record.SBQQ__Notes__c != null,
            'The notes field should be populated'
        );
        for (QuoteLineModel lineModel : quoteModel.lineItems) {
            System.assert(
                lineModel.record.SBQQ__Description__c != null,
                'The description field should be populated'
            );
        }
    }
}
