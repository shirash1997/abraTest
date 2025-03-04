@IsTest
private class AccountsTest {

    @IsTest
    static void testOnApplyDefaults() {
        // Insert Account without Description
        Account acc = new Account(Name = 'Test Account');
        insert acc;

        // Verify Description is defaulted
        Account insertedAcc = [SELECT Description FROM Account WHERE Id = :acc.Id];
        System.assertEquals('Domain classes rock!', insertedAcc.Description);
    }

    @IsTest
    static void testOnAfterUpdate() {
        // Insert Account with Description
        Account acc = new Account(Name = 'Test Account', Description = 'Initial Description');
        insert acc;

        // Update Description
        acc.Description = 'Updated Description';
        update acc;

        // Verify AnnualRevenue reflects Levenshtein distance
        Account updatedAcc = [SELECT AnnualRevenue FROM Account WHERE Id = :acc.Id];
        Integer levenshteinDistance = 'Domain classes rock!'.getLevenshteinDistance('Updated Description');
        System.assertEquals(Decimal.valueOf(levenshteinDistance), updatedAcc.AnnualRevenue);
    }
}
