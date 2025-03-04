@isTest
public with sharing class AccountTriggerTest {
    @isTest
    public static void accTest(){
        List<Account> accountsToCheck = new list<Account>();
        for (Integer i = 0; i < 200; i++) {
            accountsToCheck.add(new Account(Name = 'Test Account ' + i, BillingState = 'CA'));
        }
        
        insert accountsTOCheck;
        List<Account> accountsUpdated =[SELECT Id, ShippingState FROM Account WHERE BillingState='CA' LIMIT 200];
       
    }
}