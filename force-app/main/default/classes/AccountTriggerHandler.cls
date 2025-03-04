public with sharing class AccountTriggerHandler {
    public static void createAccounts(List<Account> accounts) {
        for (Account acc : accounts) {
            // Set ShippingState to match BillingState
            acc.ShippingState = acc.BillingState;
        }
    }
}