public with sharing class simpleExersise {
    Account accountSample= new account(Name='abc');
    insert accountSample;
    List<Contact> contacts = [select Id,Name from Contact where AccountId=:accountSample.Id];
    Map<Id,Contact> contactMap=new Map<Id,Contact>();
    for(Contact cont:contacts){
        contactMap.put(cont.Id, cont);
    }
    Id contactId ='123';
    if(!contactMap.isEmpty()){
        if(contactMap.containskey(contactId)){
            system.debug(contactMap.get(contactId).Name);
        }
    }
    contactMap.remove(contactId);
    for(Contact cont:contactMap.values()){
        system.debug(cont.Name);

    }
}