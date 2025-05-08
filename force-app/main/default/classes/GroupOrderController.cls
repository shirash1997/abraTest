public without sharing class GroupOrderController {
    
    @AuraEnabled(cacheable=true)
    public static List<GroupOrder__c> getOrders() {
        return [
            SELECT Id, Name, Dish__c, Price__c, CreatedDate
            FROM GroupOrder__c
            ORDER BY CreatedDate ASC
        ];
    }
    
    @AuraEnabled
    public static void saveOrders(String name, List<Map<String, Object>> items) {
        if (String.isBlank(name) || items == null || items.isEmpty()) {
            throw new AuraHandledException('נא להזין שם ולבחור מנות להזמנה.');
        }
        
        System.debug('>>> קיבלנו שם: ' + name);
        System.debug('>>> פריטים: ' + items);
        
        List<GroupOrder__c> ordersToInsert = new List<GroupOrder__c>();
        
        for (Map<String, Object> item : items) {
            String dish = (String)item.get('dish');
            Integer price = Integer.valueOf(String.valueOf(item.get('price')));
            
            GroupOrder__c order = new GroupOrder__c(
                Name = name,
            Dish__c = dish,
            Price__c = price
                );
            
            ordersToInsert.add(order);
        }
        
        insert ordersToInsert;
    }
    
    @AuraEnabled
    public static void resetOrders() {
        List<GroupOrder__c> allOrders = [SELECT Id FROM GroupOrder__c];
        delete allOrders;
    }
}