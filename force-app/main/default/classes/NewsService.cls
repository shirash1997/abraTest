public with sharing class NewsService {
    // Constants for API endpoint and key
    private static final String API_ENDPOINT = 'https://newsapi.org/v2/everything';
    private static final String API_KEY = '7b6f8c2f8884438dbb74fcc05b489aad';

    // Method to fetch news data
    public Map<String, Object> fetchNewsData() {
        String response = sendHttpRequest();
        return deserializeResponse(response);
    }

    // Private method to send HTTP request and get response
    private String sendHttpRequest() {
        HttpRequest httpRequest = new HttpRequest();
        httpRequest.setEndpoint(buildEndpoint());
        httpRequest.setMethod('GET');

        HttpResponse httpResponse;
        String strResponse = '';

        try {
            Http http = new Http();
            httpResponse = http.send(httpRequest);
            
            if (httpResponse.getStatusCode() == 200) {
                strResponse = httpResponse.getBody();
            } else {
                throw new CalloutException('HTTP Error: ' + httpResponse.getStatusCode() + ' ' + httpResponse.getStatus());
            }
        } catch (Exception ex) {
            throw new CalloutException('An unexpected error occurred: ' + ex.getMessage());
        }

        return strResponse;
    }

    // Private method to deserialize response and handle articles
    private Map<String, Object> deserializeResponse(String response) {
        Map<String, Object> newsJsonData = (Map<String, Object>) JSON.deserializeUntyped(response);
        
        if (newsJsonData.containsKey('articles')) {
            List<Object> articles = (List<Object>) newsJsonData.get('articles');
            handleArticles(articles);
        }

        return newsJsonData;
    }

    // Private method to handle articles and ensure 'urlToImage' exists
    private void handleArticles(List<Object> articles) {
        for (Object articleObj : articles) {
            Map<String, Object> article = (Map<String, Object>) articleObj;
            if (!article.containsKey('urlToImage')) {
                article.put('urlToImage', '');
            }
        }
    }

    // Private method to build API endpoint with query parameters
    private String buildEndpoint() {
        return API_ENDPOINT + '?q=apple&from=2024-02-25&to=2024-02-25&sortBy=popularity&apiKey=' + API_KEY;
    }
}