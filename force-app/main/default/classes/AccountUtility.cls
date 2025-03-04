public with sharing class AccountUtility {
    public static void viewAnnualRevenue() {

        List<Account> accountsList= [select Id, Name, AnnualRevenue from Account];

        for(Account acc: accountsList){
            String acctRev = 'account name: ' + acc.Name + ' annual revenue: ' + acc.AnnualRevenue;
            System.debug(acctRev);
        }

    }
}