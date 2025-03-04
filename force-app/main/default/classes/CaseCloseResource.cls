@RestResource(urlMapping='/case/*/close')
global with sharing class CaseCloseResource {
    @HttpPost
    global static void closeCase(String reason) {
        // Get Case ID from the URL
        RestRequest req = RestContext.request;
        String[] uriParts = req.requestURI.split('/');
        if (uriParts.size() < 2 || String.isBlank(uriParts[2])) {
            throw new RestServiceException('Invalid or missing Case ID in URL.');
        }

        Id caseId;
        try {
            caseId = Id.valueOf(uriParts[2]);
        } catch (Exception e) {
            throw new RestServiceException('Invalid Case ID format.');
        }

        // Call the service
        try {
            CaseService.closeCases(new Set<Id>{caseId}, reason);
        } catch (CaseService.CaseServiceException e) {
            throw new RestServiceException('Error: ' + e.getMessage());
        }
    }

    // Custom Exception for REST Errors
    global class RestServiceException extends Exception {}
}