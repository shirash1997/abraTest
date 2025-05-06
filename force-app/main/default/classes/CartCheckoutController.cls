public without sharing class CartCheckoutController  {

    @AuraEnabled
    public static void processGuestCheckout(String name, String email, String phone, Integer totalPrice,  List<Map<String, Object>> cartItems) {
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
     
        // יצירת הזמנה (Order__c)
        Order__c order = new Order__c(
            Name = 'הזמנה מ-' + name,
            Account__c = acc.Id,
            Date__c = Date.today(),
            Total_Price__c = totalPrice
        );
        insert order;
system.debug('cart in apex:' + cartItems);
        // יצירת פריטים להזמנה (Order_Item__c)
        List<Order_Item__c> orderItemsToInsert = new List<Order_Item__c>();
        for (Map<String, Object> item : cartItems) {
            String itemName = (String) item.get('name');
            Decimal quantity = Decimal.valueOf(String.valueOf(item.get('quantity')));
            Decimal unitPrice = Decimal.valueOf(String.valueOf(item.get('unitPrice')));
            Decimal total = Decimal.valueOf(String.valueOf(item.get('total')));
        

        
            orderItemsToInsert.add(new Order_Item__c(
                Order__c = order.Id,
                Name = itemName,
                Quantity__c = quantity,
                Unit_Price__c = unitPrice,
                Total__c = total
            ));
        }
        insert orderItemsToInsert;
    }
    

}