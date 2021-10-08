@RestResource(urlMapping='/cpq/pricing')
global with sharing class CPQ_PricingService {
    @HttpPost
    global static QuoteModel calculatePrice(QuoteModel quoteModel) {
        try {
            quoteModel.record.SBQQ__Notes__c = String.valueOf(System.now());
            for (QuoteLineModel lineModel : quoteModel.lineItems) {
                lineModel.record.SBQQ__Description__c =
                    'Invoked calculation service on quote line ' +
                    lineModel.record.SBQQ__Number__c +
                    ' at ' +
                    String.valueOf(System.now());
            }
            return quoteModel;
        } catch (Exception e) {
            throw new CPQ_PricingServiceException('CPQ_PricingServiceException: ' + e.getMessage());
        }
    }

    public class CPQ_PricingServiceException extends Exception {
    }
}
