@IsTest
private class AccountWrapperTests {
    @TestSetup
    static void loadTestData() {
        // Create a test account
        Account testAccount = new Account(Name = 'ACME Corporation');
        insert testAccount;

        // Generate opportunities for the test account
        List<Opportunity> opportunities = new List<Opportunity>();
        opportunities.add(new Opportunity(
            Name = 'Opportunity 1',
            StageName = 'Closed Won',
            CloseDate = Date.today(),
            Amount = 150000.00, // Increase amount
            AccountId = testAccount.Id
        ));
        opportunities.add(new Opportunity(
            Name = 'Opportunity 2',
            StageName = 'Closed Won',
            CloseDate = Date.today(),
            Amount = 80000.00,
            AccountId = testAccount.Id
        ));
        insert opportunities;
    }

    @IsTest
    static void testPositiveRoundedAveragePrice() {
        // Retrieve the test account
        Account acct = [SELECT Id FROM Account WHERE Name = 'ACME Corporation' LIMIT 1];

        // Initialize the AccountWrapper
        AccountWrapper acctWrapper = new AccountWrapper(acct);

        // Start the test
        Test.startTest();
        Decimal avgPrice = acctWrapper.getRoundedAvgPriceOfOpps();
        Test.stopTest();

        // Assert the rounded average price
        Assert.areEqual(115000.00, avgPrice, 'The rounded average price should be 115000.00');
    }

    @IsTest
    static void testIsHighPriority() {
        // Retrieve the test account
        Account acct = [SELECT Id FROM Account WHERE Name = 'ACME Corporation' LIMIT 1];

        // Initialize the AccountWrapper
        AccountWrapper acctWrapper = new AccountWrapper(acct);

        // Start the test
        Test.startTest();
        Boolean isHighPriority = acctWrapper.isHighPriority();
        Test.stopTest();

        // Assert the account is high priority
        Assert.isTrue(isHighPriority, 'The account should be marked as high priority');
    }

    @IsTest
    static void testRoundedAverageWithNoOpportunities() {
        Account noOppAccount = new Account(Name = 'No Opportunities');
        insert noOppAccount;

        AccountWrapper acctWrapper = new AccountWrapper(noOppAccount);

        Test.startTest();
        try {
            acctWrapper.getRoundedAvgPriceOfOpps();
            System.assert(false, 'Expected an exception for no opportunities');
        } catch (AccountWrapper.AWException e) {
            Assert.areEqual('No won Opportunities', e.getMessage(), 'Expected exception message for no opportunities');
        }
        Test.stopTest();
    }

    @IsTest
    static void testIsHighPriorityFalse() {
        // Create an account with opportunities that result in a low average
        Account lowPriorityAccount = new Account(Name = 'Low Priority Account');
        insert lowPriorityAccount;

        List<Opportunity> opportunities = new List<Opportunity>();
        opportunities.add(new Opportunity(
            Name = 'Opportunity 1',
            StageName = 'Closed Won',
            CloseDate = Date.today(),
            Amount = 100000.00,
            AccountId = lowPriorityAccount.Id // Use the correct account ID
        ));
        opportunities.add(new Opportunity(
            Name = 'Opportunity 2',
            StageName = 'Closed Won',
            CloseDate = Date.today(),
            Amount = 100000.00,
            AccountId = lowPriorityAccount.Id // Use the correct account ID
        ));

        insert opportunities;

        // Initialize the AccountWrapper
        AccountWrapper acctWrapper = new AccountWrapper(lowPriorityAccount);

        // Start the test
        Test.startTest();
        Boolean isHighPriority = acctWrapper.isHighPriority();
        Test.stopTest();

        // Assert the account is not high priority
        Assert.isFalse(isHighPriority, 'The account should not be marked as high priority');
    }
}
