public class QuestionScoreTriggerHandler {
    public static void handleExamTotalScore(List<Question__c> newQuestions) {
        // Collect unique Exam IDs from new Questions
        Set<Id> examIds = new Set<Id>();
        for (Question__c question : newQuestions) {
            examIds.add(question.Exam__c);
        }
        
        // Retrieve relevant Exams with their associated Questions
        Map<Id, Exam__c> examsToUpdate = new Map<Id, Exam__c>([
            SELECT Id, TotalScore__c, (SELECT Id, Score__c FROM Questions__r) 
            FROM Exam__c 
            WHERE Id IN :examIds
        ]);
        
        // Calculate and update TotalScore for each relevant Exam
        for (Question__c question : newQuestions) {
            Exam__c exam = examsToUpdate.get(question.Exam__c);
            if (exam != null) {
                Decimal newTotalScore = calculateTotalScore(exam.Questions__r);
                exam.TotalScore__c = newTotalScore;
                examsToUpdate.put(exam.Id, exam);
            }
        }
        
        // Update relevant Exams
        update examsToUpdate.values();
    }
    
    // Calculate total score based on associated Questions
    private static Decimal calculateTotalScore(List<Question__c> questions) {
        Decimal totalScore = 0;
        for (Question__c question : questions) {
            totalScore += question.Score__c;
        }
        return totalScore;
    }
}