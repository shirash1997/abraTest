public with sharing class PropertyUtility {
    public static void newListedProperties() {

        List<Property__c> newPropList = [select Name, Broker__r.Email__c, Days_On_Market__c from Property__c where Days_On_Market__c <= 30];
        for (Property__c prop : newPropList) {
            string propEmail = prop.Name + ' : ' + prop.Broker__r.Email__c;
            system.debug(propEmail);
        }
    }
}