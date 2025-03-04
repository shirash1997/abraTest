@IsTest
public class OtherCSVTests {
    @TestSetup
    static void makeData(){
        List<sObject> accounts = Test.loadData(Account.SObjectType, 'otherAccountData');
    }
    
    @isTest
    public static void testLoadOtherAccountsFromStaticResource (){
        Test.startTest();
        List<Account> accts = [SELECT ID FROM Account];
        Test.stopTest();
        assert.isTrue(accts.size()==15, 'Expected 5 accounts');
    }
    
    
    
}