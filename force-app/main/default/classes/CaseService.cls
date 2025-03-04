public with sharing class CaseService {
    public static void closeCases(Set<Id> caseIds, String closeReason) {
        // Validate parameters
        if (caseIds == null || caseIds.isEmpty()) {
            throw new CaseServiceException('No case IDs provided.');
        }
        if (String.isBlank(closeReason)) {
            throw new CaseServiceException('Close reason must be provided.');
        }

        // Query cases
        List<Case> casesToUpdate = [SELECT Id, Status, 	Reason FROM Case WHERE Id IN :caseIds];

        if (casesToUpdate.isEmpty()) {
            throw new CaseServiceException('No cases found for the provided IDs.');
        }

        // Update cases
        for (Case c : casesToUpdate) {
            c.Status = 'Closed'; // Adjust the status as per your org's configurations
            c.Reason = closeReason;
        }

        try {
            update casesToUpdate;
        } catch (DmlException e) {
            throw new CaseServiceException('Error closing cases: ' + e.getMessage());
        }
    }

    // Custom Exception
    public class CaseServiceException extends Exception {}
}