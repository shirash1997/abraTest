public with sharing class SmartListViewController {

    @AuraEnabled(cacheable=true)
    public static List<String> getSObjects() {
        // מציג רק אובייקטים סטנדרטיים ו־Custom שניתנים לשאילתה
        List<String> objectNames = new List<String>();
        for (Schema.SObjectType sObj : Schema.getGlobalDescribe().values()) {
            Schema.DescribeSObjectResult describe = sObj.getDescribe();
            if (describe.isQueryable() && !describe.isDeprecatedAndHidden()) {
                objectNames.add(describe.getName());
            }
        }
        return objectNames;
    }

    @AuraEnabled(cacheable=true)
    public static List<String> getFields(String objectName) {
        Map<String, Schema.SObjectField> fields = Schema.getGlobalDescribe().get(objectName).getDescribe().fields.getMap();
        return new List<String>(fields.keySet());
    }

    @AuraEnabled
    public static List<SObject> getRecords(String objectName, List<String> fields) {
        if (fields == null || fields.isEmpty()) return new List<SObject>();

        String soql = 'SELECT ' + String.join(fields, ',') + ' FROM ' + objectName + ' LIMIT 100';
        return Database.query(soql);
    }
}
