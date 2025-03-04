public with sharing class BestSellersController {
    @AuraEnabled(cacheable=true)
    public static Map<String, Object> getBestSellersData() {
        HttpRequest httpRequest = new HttpRequest();
        httpRequest.setEndpoint('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=vLuSzF1fhGf8zqwu66fQWv3AIMFCNfbS');
        httpRequest.setMethod('GET');

        HttpResponse httpResponse;
        String strResponse;
        Map<String, Object> bestSellersJsonData = new Map<String, Object>();

        try {
            Http http = new Http();
            httpResponse = http.send(httpRequest);

            if (httpResponse.getStatusCode() == 200) {
                strResponse = httpResponse.getBody();
                if (!String.isBlank(strResponse)) {
                    bestSellersJsonData = (Map<String, Object>) JSON.deserializeUntyped(strResponse);
                }
            } else {
                throw new CalloutException('HTTP Error: ' + httpResponse.getStatusCode() + ' ' + httpResponse.getStatus());
            }
        } catch (CalloutException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new CalloutException('An unexpected error occurred: ' + ex.getMessage());
        }

        return bestSellersJsonData;
    }
}