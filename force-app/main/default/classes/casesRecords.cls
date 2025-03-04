public with sharing class casesRecords {
    @AuraEnabled(cacheable=true)
    public static List<Case> getCases(){
        return [SELECT Id, Subject, CaseNumber, ContactId FROM Case];
    }
}