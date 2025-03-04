trigger updateAccountSummary on Account (before insert, after update) {

if(Trigger.isInsert||Trigger.isUpdate){
    AccountHelper.updateAccountSummary(Trigger.new);
}

}