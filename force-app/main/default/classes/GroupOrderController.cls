public without sharing class GroupOrderController {

    public class GroupOrderItem {
        @AuraEnabled public String dish;
        @AuraEnabled public Integer price;
    }

    @AuraEnabled(cacheable=true)
    public static List<GroupOrder__c> getOrders() {
        return [
            SELECT Id, Name, Dish__c, Price__c, CreatedDate
            FROM GroupOrder__c
            ORDER BY CreatedDate ASC
        ];
    }

    @AuraEnabled
    public static void saveOrders(String name, List<GroupOrderItem> items) {
        if (String.isBlank(name) || items == null || items.isEmpty()) {
            throw new AuraHandledException('Name and items are required');
        }

        List<GroupOrder__c> newOrders = new List<GroupOrder__c>();

        for (GroupOrderItem item : items) {
            GroupOrder__c order = new GroupOrder__c();
            order.Name = name;
            order.Dish__c = item.dish;
            order.Price__c = item.price;
            newOrders.add(order);
        }

        insert newOrders;
    }
}
