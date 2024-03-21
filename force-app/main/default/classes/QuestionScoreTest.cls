@isTest
private class QuestionScoreTest {
    @isTest
    static void testCalculateTotalScoreTrigger() {
        // Create Exam
        Exam__c exam = new Exam__c(Name = 'Test Exam');
        insert exam;

        // Create Questions for the Exam
        Question__c question1 = new Question__c(Exam__c = exam.Id, Score__c = 10);
        Question__c question2 = new Question__c(Exam__c = exam.Id, Score__c = 20);
        insert new List<Question__c>{question1, question2};

        // Verify Total Score before trigger execution
        exam = [SELECT Id, TotalScore__c FROM Exam__c WHERE Id = :exam.Id];
        System.assertEquals(30, exam.TotalScore__c);

        // Update question1 to change the score
        question1.Score__c = 15;
        update question1;

        // Verify Total Score after updating a question's score
        exam = [SELECT Id, TotalScore__c FROM Exam__c WHERE Id = :exam.Id];
        System.assertEquals(35, exam.TotalScore__c);

        // Create a new question for the Exam
        Question__c question3 = new Question__c(Exam__c = exam.Id, Score__c = 25);
        insert question3;

        // Verify Total Score after inserting a new question
        exam = [SELECT Id, TotalScore__c FROM Exam__c WHERE Id = :exam.Id];
        System.assertEquals(60, exam.TotalScore__c);
    }
}
