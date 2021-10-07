@RestResource(urlMapping='/cpq/pricing')
global with sharing class CPQ_PricingService {
    @HttpPost
    global static String doHandlePricingCalc(String quoteLineModelsString) {
        try {
            List<QuoteLineModel> quoteLineModels = (List<QuoteLineModel>) JSON.deserialize(
                quoteLineModelsString,
                List<QuoteLineModel>.class
            );
            return 'there are ' + quoteLineModels.size() + ' line items on this quote';
        } catch (Exception e) {
            throw new CPQ_PricingServiceException(e.getMessage());
        }
    }

    public class CPQ_PricingServiceException extends Exception {
    }
}
