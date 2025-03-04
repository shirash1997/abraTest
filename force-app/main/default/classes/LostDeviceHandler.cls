global with sharing class LostDeviceHandler {

    // @HttpPost
    // global static String reportLostDevice() {
    //     RestRequest req = RestContext.request;
    //     RestResponse res = RestContext.response;

    //     String assetIdentifier;

    //     try {
    //         // Parse the JSON request body
    //         Map<String, Object> requestBody = (Map<String, Object>) JSON.deserializeUntyped(req.requestBody.toString());
    //         assetIdentifier = (String) requestBody.get('assetIdentifier');
    //     } catch (Exception e) {
    //         return 'Invalid request body format.';
    //     }

    //     if (String.isBlank(assetIdentifier)) {
    //         return 'Asset identifier is missing.';
    //     }

    //     // Query Asset
    //     List<Asset> assets = [SELECT Id, Status, Name FROM Asset WHERE Asset_Identifier__c = :assetIdentifier LIMIT 1];
    //     if (assets.isEmpty()) {
    //         return 'No device found.';
    //     }

    //     Asset asset = assets[0];

    //     // Query Claims
    //     List<Claim__c> existingClaims = [SELECT Name, Type__c FROM Claim__c WHERE Asset__c = :asset.Id AND Type__c = 'Loss' LIMIT 1];
    //     if (!existingClaims.isEmpty()) {
    //         return existingClaims[0].Name + ' already filed.';
    //     }

    //     // Query Insurance
    //     List<Insurance__c> insurances = [SELECT Id, Active__c, Coverage__c FROM Insurance__c WHERE Asset__c = :asset.Id LIMIT 1];
    //     if (insurances.isEmpty() || !insurances[0].Active__c || insurances[0].Coverage__c != 'Comprehensive') {
    //         asset.Status = 'Lost';
    //         update asset;
    //         return 'No coverage. Asset status adjusted to Lost.';
    //     }

    //     // Create a new Claim
    //     Claim__c claim = new Claim__c(
    //         Asset__c = asset.Id,
    //         Type__c = 'Loss'
    //     );
    //     insert claim;

    //     // Update Asset status
    //     asset.Status = 'Lost';
    //     update asset;

    //     return claim.Name;
    // }
}