@IsTest
private class PermissionsTests {
    @TestSetup
    static void testSetup() {
        // GIVEN: Create test data
        Account acct = TestFactory.getAccount('Test Account', true);
        Private_Object__c privateObj = new Private_Object__c(
            Account__c = acct.Id, 
            Notes__c = 'This is a private note'
        );
        insert privateObj;
    }

    @IsTest
    static void testNegativePermissionSet() {
        // GIVEN: Create a user without the permission set using TestFactory
        User userNew = TestFactory.generateUser('Standard User');
        
        System.runAs(userNew) {
            // WHEN: Run as the new user without permissions
            Test.startTest();
            Private_Object__c[] privateObj = [SELECT Id, Account__c, Notes__c FROM Private_Object__c];
            Test.stopTest();

            // THEN: Verify the user cannot see any records
            Assert.areEqual(
                0,
                privateObj.size(),
                'A user without the permission set shouldn\'t see any records'
            );
        }
    }

    @IsTest
    static void testPositivePermissionSet() {
        // GIVEN: Create a user with the permission set using TestFactory
        User userNew = TestFactory.generateUser('Standard User');

        // Query the Permission Set
        PermissionSet permSet = [
            SELECT Id 
            FROM PermissionSet 
            WHERE Name = 'Private_Object_Access'
        ];

        // Assign the Permission Set to the user
        insert new PermissionSetAssignment(
            AssigneeId = userNew.Id,
            PermissionSetId = permSet.Id
        );

        System.runAs(userNew) {
            // WHEN: Run as the user with the permission set
            Test.startTest();
            Private_Object__c[] privateObj = [SELECT Id, Account__c, Notes__c FROM Private_Object__c];
            Test.stopTest();

            // THEN: Verify the user can see the records
            Assert.areEqual(
                1,
                privateObj.size(),
                'A user with the permission set should see the records'
            );
        }
    }
}
