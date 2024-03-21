public with sharing class ContactExamController {
    @AuraEnabled(cacheable=true)
    public static List<Exam__c> getContactExams(Id contactId) {
        // Query exam records related to the Contact along with their related questions
        return [SELECT Id, Name, Datetime_of_Exam__c, TotalScore__c,
                       (SELECT Id, Name, Score__c FROM Questions__r)
                FROM Exam__c 
                WHERE Contact__r.Id = :contactId];
    }
}
