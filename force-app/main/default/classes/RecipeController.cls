public with sharing class RecipeController {
    @AuraEnabled(cacheable=true)
    public static Map<String, Object> getRecipesDataFromService() {
        RecipeService recipeService = new RecipeService();
        return recipeService.getRecipesData();
    }
}