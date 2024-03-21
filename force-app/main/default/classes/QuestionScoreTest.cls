@isTest
private class QuestionScoreTest {
    @isTest
    static void testCalculateTotalScoreTrigger() {
        Exam__c exam = new Exam__c(Name = 'Test Exam');
        insert exam;
 
        Question__c question1 = new Question__c(Exam__c = exam.Id, Score__c = 10);
        Question__c question2 = new Question__c(Exam__c = exam.Id, Score__c = 20);
        insert new List<Question__c>{question1, question2};

        exam = [SELECT Id, TotalScore__c FROM Exam__c WHERE Id = :exam.Id];
        System.assertEquals(30, exam.TotalScore__c);

        question1.Score__c = 15;
        update question1;

        exam = [SELECT Id, TotalScore__c FROM Exam__c WHERE Id = :exam.Id];
        System.assertEquals(35, exam.TotalScore__c);

        Question__c question3 = new Question__c(Exam__c = exam.Id, Score__c = 25);
        insert question3;

        exam = [SELECT Id, TotalScore__c FROM Exam__c WHERE Id = :exam.Id];
        System.assertEquals(60, exam.TotalScore__c);
    }
}
