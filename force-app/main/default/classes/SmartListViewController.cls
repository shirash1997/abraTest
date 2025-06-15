public with sharing class SmartListViewController {
    
    @AuraEnabled(cacheable=true)
    public static List<String> getSObjects() {
        List<String> objectNames = new List<String>();
        for (Schema.SObjectType sObj : Schema.getGlobalDescribe().values()) {
            Schema.DescribeSObjectResult describe = sObj.getDescribe();
            if (describe.isQueryable() && !describe.isDeprecatedAndHidden()) {
                objectNames.add(describe.getName());
            }
        }
        objectNames.sort();
        return objectNames;
    }
    
    public class DisplayField {
        @AuraEnabled public String label;
        @AuraEnabled public String value;
        @AuraEnabled public Boolean isReference;
        @AuraEnabled public List<DisplayField> childFields;
    }
    
    @AuraEnabled(cacheable=true)
    public static List<DisplayField> getFieldsWithParents(String objectName) {
        List<DisplayField> result = new List<DisplayField>();
        Map<String, Schema.SObjectField> fields = Schema.getGlobalDescribe().get(objectName).getDescribe().fields.getMap();
        
        for (String fieldName : fields.keySet()) {
            Schema.DescribeFieldResult fieldDesc = fields.get(fieldName).getDescribe();
            
            DisplayField df = new DisplayField();
            df.label = fieldDesc.getLabel();
            df.value = fieldName;
            df.isReference = fieldDesc.getType() == Schema.DisplayType.REFERENCE;
            
            // אם זה שדה רפרנס – נטען את השדות של האובייקט המקושר
            if (df.isReference && fieldDesc.getReferenceTo().size() > 0) {
                String parentObject = fieldDesc.getReferenceTo()[0].getDescribe().getName();
                Map<String, Schema.SObjectField> parentFields = Schema.getGlobalDescribe().get(parentObject).getDescribe().fields.getMap();
                
                df.childFields = new List<DisplayField>();
                for (String childFieldName : parentFields.keySet()) {
                    Schema.DescribeFieldResult childDesc = parentFields.get(childFieldName).getDescribe();
                    if (!childDesc.isAccessible() || childDesc.getType() == Schema.DisplayType.ADDRESS || childDesc.getType() == Schema.DisplayType.LOCATION) continue;
                    
                    DisplayField child = new DisplayField();
                    child.label = childDesc.getLabel();
                    child.value = childFieldName;
                    df.childFields.add(child);
                }
                
                // רק אם יש לפחות שדה אחד
                if (df.childFields.isEmpty()) {
                    df.childFields = null;
                }
            }
            
            result.add(df);
        }
        
        return result;
    }
    
    @AuraEnabled
    public static List<SObject> getRecords(String objectName, List<String> fields) {
        if (String.isBlank(objectName) || fields == null || fields.isEmpty()) {
            return new List<SObject>();
        }
        
        List<String> transformedFields = new List<String>();
        for (String f : fields) {
            transformedFields.add(transformField(f, objectName));
        }
        
        String query = 'SELECT ' + String.join(transformedFields, ',') + ' FROM ' + objectName + ' LIMIT 100';
        
        try {
            return Database.query(query);
        } catch (Exception e) {
            throw new AuraHandledException('שגיאה בבניית SOQL: ' + e.getMessage());
        }
    }
    
    
    public static String transformField(String field, String objectName) {
        if (!field.contains('.')) return field;
        
        String[] parts = field.split('\\.');
        if (parts.size() != 2) return field;
        
        String parentField = parts[0];
        String childField = parts[1];
        
        Schema.DescribeSObjectResult objDesc = Schema.getGlobalDescribe().get(objectName).getDescribe();
        Map<String, Schema.SObjectField> fieldMap = objDesc.fields.getMap();
        
        if (!fieldMap.containsKey(parentField)) return field;
        
        Schema.DescribeFieldResult fDesc = fieldMap.get(parentField).getDescribe();
        if (fDesc.getType() != Schema.DisplayType.REFERENCE) return field;
        
        // נקבל את שם האובייקט המקושר
        String parentObject = fDesc.getReferenceTo()[0].getDescribe().getName();
        
        // לפעמים שם הלוקאפ הוא AccountId, אבל ה־Relationship נקרא Account
        String relationshipName = fDesc.getRelationshipName();
        if (String.isBlank(relationshipName)) {
            relationshipName = parentObject;
        }
        
        return relationshipName + '.' + childField;
    }
    
}