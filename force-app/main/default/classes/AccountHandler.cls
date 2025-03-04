public with sharing class AccountHandler {
    public static void insertAccount(Integer accountsNumber) {
        List<Account> addAccounts=new List<Account>();
        Integer N = 1;
        
        while(N<=accountsNumber){
            addAccounts.add(new Account(Name='Acme Inc'+ N, AccountNumber='A000'+N));
            N++;
        }
        insert addAccounts;

    }
}