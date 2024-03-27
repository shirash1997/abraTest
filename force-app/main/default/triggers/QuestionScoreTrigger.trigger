trigger questionScoreTrigger on Question__c (after insert, after update) {
    if (Trigger.isAfter && (Trigger.isInsert || Trigger.isUpdate)) {
        List<Question__c> questionsToUpdate = new List<Question__c>();
        Set<Id> examsChanged = new Set<Id>();

        for (Question__c newQuestion : Trigger.new) {
            if ((Trigger.isInsert || Trigger.isUpdate) && 
                (Trigger.oldMap == null || Trigger.oldMap.get(newQuestion.Id).Score__c != newQuestion.Score__c) &&
                newQuestion.Score__c != null && newQuestion.Exam__c != null) {
                questionsToUpdate.add(newQuestion);
            }
            
            if (Trigger.oldMap != null && 
                Trigger.oldMap.get(newQuestion.Id).Exam__c != newQuestion.Exam__c && newQuestion.Exam__c != null) {
                questionsToUpdate.add(newQuestion);
                examsChanged.add(Trigger.oldMap.get(newQuestion.Id).Exam__c);
                examsChanged.add(newQuestion.Exam__c);
            }
        }

        if (!examsChanged.isEmpty()) {
            questionsToUpdate.addAll([SELECT Id, Score__c FROM Question__c WHERE Exam__c IN :examsChanged]);
        }

        if (!questionsToUpdate.isEmpty()) {
            QuestionScoreTriggerHandler.handleExamTotalScore(questionsToUpdate);
        }
    }
}
