public with sharing class class2 {
    List<Account> accounts= [select Id, Name, (Select Id , FirstName from Contacts) from Account];
    
    Map<Id,List<Contact>> accountAndRelatedContacts=new Map<Id,List<Contact>>();
    for(Account acc:accounts){
        accountAndRelatedContacts.put(acc.Id,acc.contacts);
    }
    Id accountId='123';
    if(!accountAndRelatedContacts.isEmpty()){
        if(accountAndRelatedContacts.containskey(accountId)){
            List<Contact> retrievedContacts= accountAndRelatedContacts.get(accountId);
            for(Contact cont:retrievedContacts){
                system.debug(cont.FirstName);
                
            }
        }
        accountAndRelatedContacts.remove(accountId);
        for(Id accId:accountAndRelatedContacts.keysets()){
List<Contact> remainingContacts= accountAndRelatedContacts.get(accId)  ;
for(Contact contList:remainingContacts){
    system.debug('Account Id'+ accId +'Contact Name'+ contList.name);
}      }
    }