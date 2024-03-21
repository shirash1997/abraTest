trigger QuestionScoreTrigger on Question__c (after insert, after update) {
    if (Trigger.isAfter) {
        if (Trigger.isInsert || Trigger.isUpdate) {
            QuestionScoreTriggerHandler.handleQuestionScore(Trigger.new);
        }
    }
}
