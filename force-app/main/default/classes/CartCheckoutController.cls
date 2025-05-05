public with sharing class CartCheckoutController  {

    @AuraEnabled
    public static void processGuestCheckout(String name, String email, String phone, List<OrderItemDTO> cartItems) {
        if (String.isBlank(name) || String.isBlank(email) || cartItems == null || cartItems.isEmpty()) {
            throw new AuraHandledException('נא למלא את כל הפרטים ולבחור מוצרים לעגלה.');
        }

        // יצירת חשבון (Account)
        Id personAccountRecordTypeId = [
            SELECT Id FROM RecordType 
            WHERE SObjectType = 'Account' AND IsActive = true AND Name = 'Person Account'
            LIMIT 1
        ].Id;

        // יצירת חשבון מסוג Person Account
        Account acc = new Account(
            RecordTypeId = personAccountRecordTypeId,
            LastName = name, // חובה ב-Person Account
            Phone = phone,
            PersonEmail = email
        );
        insert acc;

        // חישוב סכום כולל
        Decimal totalOrderPrice = 0;
        for (OrderItemDTO item : cartItems) {
            totalOrderPrice += item.total;
        }

        // יצירת הזמנה (Order__c)
        Order__c order = new Order__c(
            Name = 'הזמנה מ-' + name,
            Account__c = acc.Id,
            Date__c = Date.today(),
            Total_Price__c = totalOrderPrice
        );
        insert order;

        // יצירת פריטים להזמנה (Order_Item__c)
        List<Order_Item__c> orderItemsToInsert = new List<Order_Item__c>();
        for (OrderItemDTO item : cartItems) {
            orderItemsToInsert.add(new Order_Item__c(
                Order__c = order.Id,
                Name = item.name,
                Quantity__c = item.quantity,
                Unit_Price__c = item.unitPrice,
                Total__c = item.total
            ));
        }
        insert orderItemsToInsert;
    }

    public class OrderItemDTO {
        @AuraEnabled public String name;
        @AuraEnabled public Integer quantity;
        @AuraEnabled public Decimal unitPrice;
        @AuraEnabled public Decimal total;
    }
}
