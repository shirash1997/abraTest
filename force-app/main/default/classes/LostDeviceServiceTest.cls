@IsTest
private class LostDeviceServiceTest {
    @TestSetup
    static void setupTestData() {
        // Create an Account
        Account account = new Account(Name = 'Test Account');
        insert account;

        // Create an Asset related to the Account
        Asset asset = new Asset(
            Name = 'Test Device',
            Asset_Identifier__c = '12345',
            Status = 'Active',
            AccountId = account.Id
        );
        insert asset;
    }

    @IsTest
    static void testNoClaimsFound() {
        RestRequest req = new RestRequest();
        req.params.put('deviceId', '12345'); // Asset exists but no claims are associated
        RestContext.request = req;
        RestContext.response = new RestResponse();

        String result = LostDeviceService.trackInsuranceClaims();
        System.assertEquals('No insurance claims found for device 12345.', result);
    }

    @IsTest
    static void testTrackInsuranceClaims() {
        RestRequest req = new RestRequest();
        req.params.put('deviceId', '12345');
        RestContext.request = req;
        RestContext.response = new RestResponse();

        String result = LostDeviceService.trackInsuranceClaims();
        System.assert(result.contains('Insurance claims for device 12345:'));
    }

    @IsTest
    static void testDeviceNotFound() {
        RestRequest req = new RestRequest();
        req.params.put('deviceId', 'INVALID');
        RestContext.request = req;
        RestContext.response = new RestResponse();

        String result = LostDeviceService.trackInsuranceClaims();
        System.assertEquals('Device with ID INVALID not found.', result);
    }
}