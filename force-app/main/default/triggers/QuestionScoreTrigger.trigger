trigger QuestionScoreTrigger on Question__c (after insert, after update) {
    if (Trigger.isAfter && (Trigger.isInsert || Trigger.isUpdate)) {
        List<Question__c> questionsToUpdate = new List<Question__c>();
        
        for (Question__c newQuestion : Trigger.new) {
            if ((Trigger.isInsert) ||
                (Trigger.oldMap != null && Trigger.oldMap.containsKey(newQuestion.Id) &&
                 (Trigger.oldMap.get(newQuestion.Id).Score__c != newQuestion.Score__c ||
                  Trigger.oldMap.get(newQuestion.Id).Exam__c != newQuestion.Exam__c))) {
                questionsToUpdate.add(newQuestion);
            }
        }
        
        if (!questionsToUpdate.isEmpty()) {
            QuestionScoreTriggerHandler.handleQuestionScore(questionsToUpdate);
        }
    }
}
