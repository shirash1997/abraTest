public with sharing class OpportunityChecker {
    @AuraEnabled(cacheable=true)
    public static Boolean hasClosedWonOpportunities() {
        return [SELECT COUNT() FROM Opportunity WHERE StageName = 'Closed Won'] > 0;
    }
}
