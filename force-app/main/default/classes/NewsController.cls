public with sharing class NewsController {
    @AuraEnabled(cacheable=true)
    public static Map<String, Object> getNewsDataFromService() {
        NewsService newsService1 = new NewsService();
        return newsService1.fetchNewsData();
    }
}