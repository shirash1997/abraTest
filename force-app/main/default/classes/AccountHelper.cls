public with sharing class AccountHelper {
    public static void updateAccountSummary(List<Account> accountLIst){
        if(accountLIst.size()>0){
            for(Account acc:accountLIst){
                acc.Account_Summary__c ='message';
                
            }
        }
        update accountLIst;
    }
}