public with sharing class RecipeService {
    private static Map<String, Object> getRecipes() {
        HttpRequest httpRequest = new HttpRequest();
        httpRequest.setEndpoint('https://food-recipes-with-images.p.rapidapi.com/?q=chicken%20soup');
        httpRequest.setMethod('GET');
        httpRequest.setHeader('X-RapidAPI-Key', 'bde9c35dc0msh9c9a04231e278b7p171ff4jsnfea836476ae0');

        HttpResponse httpResponse;
        String strResponse;
        Map<String, Object> recipeJsonData = new Map<String, Object>();

        try {
            Http http = new Http();
            httpResponse = http.send(httpRequest);

            if (httpResponse.getStatusCode() == 200) {
                strResponse = httpResponse.getBody();
                if (!String.isBlank(strResponse)) {
                    recipeJsonData = (Map<String, Object>) JSON.deserializeUntyped(strResponse);
                }
            } else {
                throw new CalloutException('HTTP Error: ' + httpResponse.getStatusCode() + ' ' + httpResponse.getStatus());
            }
        } catch (CalloutException ex) {
            throw ex; // Rethrow the CalloutException
        } catch (Exception ex) {
            throw new CalloutException('An unexpected error occurred: ' + ex.getMessage()); // Handle other exceptions
        }

        return recipeJsonData;
    }

    public Map<String, Object> getRecipesData(){
        return getRecipes();
    }
}