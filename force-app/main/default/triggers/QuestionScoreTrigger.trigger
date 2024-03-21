trigger QuestionScoreTrigger on Question__c (after insert, after update) {
    // Collect Exam Ids for all affected questions
    Set<Id> examIds = new Set<Id>();
    for (Question__c question : Trigger.new) {
        examIds.add(question.Exam__c);
    }
 
    // Fetch existing Total Scores for affected Exams
    Map<Id, Exam__c> examsToUpdate = new Map<Id, Exam__c>([
        SELECT Id, TotalScore__c, (SELECT Id, Score__c FROM Questions__r) 
        FROM Exam__c 
        WHERE Id IN :examIds
    ]);

    // Iterate over each question to calculate the new Total Score
    for (Question__c question : Trigger.new) {
        Exam__c exam = examsToUpdate.get(question.Exam__c);
        if (exam != null) {
            Decimal newTotalScore = 0;
            for (Question__c q : exam.Questions__r) {
                newTotalScore += q.Score__c;
            }
            exam.TotalScore__c = newTotalScore;
            // Add Exam to the map for update
            examsToUpdate.put(exam.Id, exam);
        }
    }

    // Update the Total Scores for affected Exams
    update examsToUpdate.values();
}
