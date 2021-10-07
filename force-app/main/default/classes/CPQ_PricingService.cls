@RestResource(urlMapping='/cpq/pricing')
global with sharing class CPQ_PricingService {
    @HttpPost
    global static String calculatePrice(String quoteModelString) {
        try {
            QuoteModel quoteModel = (QuoteModel) JSON.deserialize(
                quoteModelString,
                QuoteModel.class
            );
            return 'there are ' + quoteModel.lineItems.size() + ' line items on this quote';
        } catch (Exception e) {
            throw new CPQ_PricingServiceException('CPQ_PricingServiceException: ' + e.getMessage());
        }
    }

    public class CPQ_PricingServiceException extends Exception {
    }
}
