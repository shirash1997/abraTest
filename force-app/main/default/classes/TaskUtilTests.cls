@isTest
public with sharing class TaskUtilTests {
    @TestSetup
    static void makeData(){
        Lead lead = new Lead(State='AE', LastName='Test', Company='Test Co');
        insert lead;
    }

    @isTest
    public static void testGetTaskPriorityNormal (){
        
        Lead leadTest = [select Id, State from Lead where State = 'AE' limit 1];
        test.startTest();
        String priority = TaskUtil.getTaskPriority(leadTest.State);
        test.stopTest();
        System.Assert.areEqual('Normal',priority);
    }
    @isTest
    public static void testGetTaskPriorityHigh   (){
        
        Lead leadTest = [select Id, State from Lead where State = 'AE' limit 1];
        leadTest.State='CA';
        update leadTest;
        test.startTest();
        String priority = TaskUtil.getTaskPriority(leadTest.State);
        test.stopTest();
        System.Assert.areEqual('High',priority);
    }
    
}