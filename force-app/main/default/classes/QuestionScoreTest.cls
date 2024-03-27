@isTest
private class QuestionScoreTest {
    @isTest
    static void testCalculateTotalScoreTrigger() {
        // Test data setup
        Exam__c exam = new Exam__c(Name = 'Test Exam');
        insert exam;

        // Insert questions
        Question__c question1 = new Question__c(Exam__c = exam.Id, Score__c = 10);
        Question__c question2 = new Question__c(Exam__c = exam.Id, Score__c = 20);
        insert new List<Question__c>{question1, question2};

        // Validate total score after questions inserted
        exam = [SELECT Id, TotalScore__c FROM Exam__c WHERE Id = :exam.Id];
        System.assertEquals(30, exam.TotalScore__c);

        // Update question1 score
        question1.Score__c = 15;
        update question1;

        // Validate total score after question1 score updated
        exam = [SELECT Id, TotalScore__c FROM Exam__c WHERE Id = :exam.Id];
        System.assertEquals(35, exam.TotalScore__c);

        // Insert another question
        Question__c question3 = new Question__c(Exam__c = exam.Id, Score__c = 25);
        insert question3;

        // Validate total score after question3 inserted
        exam = [SELECT Id, TotalScore__c FROM Exam__c WHERE Id = :exam.Id];
        System.assertEquals(60, exam.TotalScore__c);

        // Test updating Exam__c field in Question__c
        exam = new Exam__c(Name = 'Second Test Exam');
        insert exam;

        question1.Exam__c = exam.Id;
        update question1;

        // Validate total score after exam field updated in question
        exam = [SELECT Id, TotalScore__c FROM Exam__c WHERE Id = :exam.Id];
        System.assertEquals(15, exam.TotalScore__c);
    }
}
