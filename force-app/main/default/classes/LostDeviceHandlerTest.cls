@IsTest
private class LostDeviceHandlerTest {

    @TestSetup
    static void setupTestData() {
        // Create an Account
        Account account = new Account(Name = 'Test Account');
        insert account;

        // Create an Asset
        Asset asset = new Asset(
            Name = 'Test Drone',
            Asset_Identifier__c = 'ASSET123',
            Status = 'Active',
            AccountId = account.Id
        );
        insert asset;

        // Create Insurance for the Asset
        Insurance__c insurance = new Insurance__c(
            Asset__c = asset.Id,
            Active__c = true,
            Coverage__c = 'Comprehensive'
        );
        insert insurance;

        // Create a second Asset without Insurance
        Asset assetNoInsurance = new Asset(
            Name = 'Drone No Insurance',
            Asset_Identifier__c = 'NO_INSURANCE',
            Status = 'Active',
            AccountId = account.Id
        );
        insert assetNoInsurance;

        // Create a Claim for the first Asset
        Claim__c existingClaim = new Claim__c(
            Asset__c = asset.Id,
            Type__c = 'Loss'
        );
        insert existingClaim;
    }

    @IsTest
    static void testInvalidRequestBody() {
        RestRequest req = new RestRequest();
        req.requestBody = Blob.valueOf('Invalid JSON');
        RestContext.request = req;

        String result = LostDeviceHandler.reportLostDevice();
    }

    @IsTest
    static void testMissingAssetIdentifier() {
        RestRequest req = new RestRequest();
        req.requestBody = Blob.valueOf('{}');
        RestContext.request = req;

        String result = LostDeviceHandler.reportLostDevice();
    }

    @IsTest
    static void testNoDeviceFound() {
        RestRequest req = new RestRequest();
        req.requestBody = Blob.valueOf('{"assetIdentifier":"INVALID_ASSET"}');
        RestContext.request = req;

        String result = LostDeviceHandler.reportLostDevice();
    }

    @IsTest
    static void testClaimAlreadyFiled() {
        RestRequest req = new RestRequest();
        req.requestBody = Blob.valueOf('{"assetIdentifier":"ASSET123"}');
        RestContext.request = req;

        String result = LostDeviceHandler.reportLostDevice();
    }

    @IsTest
    static void testNoCoverage() {
        RestRequest req = new RestRequest();
        req.requestBody = Blob.valueOf('{"assetIdentifier":"NO_INSURANCE"}');
        RestContext.request = req;

        String result = LostDeviceHandler.reportLostDevice();
    }

    @IsTest
    static void testValidClaim() {
        // Remove the existing claim to test valid claim scenario
        delete [SELECT Id FROM Claim__c WHERE Name = 'Existing Claim'];

        RestRequest req = new RestRequest();
        req.requestBody = Blob.valueOf('{"assetIdentifier":"ASSET123"}');
        RestContext.request = req;

        String result = LostDeviceHandler.reportLostDevice();
    }
}