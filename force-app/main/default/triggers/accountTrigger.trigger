trigger AccountTrigger on Account (before insert) {
    if(Trigger.isBefore && Trigger.isInsert){
        AccountOpportunitiesUpdate.collectOpp (Trigger.new);
        AccountTriggerHandler.CreateAccounts(Trigger.new);
    }

    
}