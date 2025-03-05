public with sharing class AccountOpportunitiesUpdate {
    public static Map<Id, List<Opportunity>> collectOpp(Set<Id> accountIds) {
        Map<Id, List<Opportunity>> accountOppsMap = new Map<Id, List<Opportunity>>();

        // שליפת כל ה-Opportunities הקשורות לחשבונות
        List<Opportunity> opps = [
            SELECT Id, Name, AccountId FROM Opportunity WHERE AccountId IN :accountIds
        ];

        // שמירת ה-Opportunities בתוך מפה לפי חשבון
        for (Opportunity opp : opps) {
            if (!accountOppsMap.containsKey(opp.AccountId)) {
                accountOppsMap.put(opp.AccountId, new List<Opportunity>());
            }
            accountOppsMap.get(opp.AccountId).add(opp);
        }

        return accountOppsMap;
    }
}
