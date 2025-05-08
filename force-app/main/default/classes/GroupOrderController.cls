global without sharing class GroupOrderController {

    @AuraEnabled
    public static void saveOrders(String name, String itemsJson) {
        if (String.isBlank(name) || String.isBlank(itemsJson)) {
            throw new AuraHandledException('שם ופריטים נדרשים');
        }

        List<GroupOrder__c> newOrders = new List<GroupOrder__c>();

        // parse JSON manually
        List<Object> rawItems = (List<Object>) JSON.deserializeUntyped(itemsJson);

        for (Object o : rawItems) {
            Map<String, Object> item = (Map<String, Object>) o;
            String dish = (String)item.get('dish');
            Decimal price = Decimal.valueOf(String.valueOf(item.get('price')));

            newOrders.add(new GroupOrder__c(
                Name = name,
                Dish__c = dish,
                Price__c = price
            ));
        }

        insert newOrders;
    }
}