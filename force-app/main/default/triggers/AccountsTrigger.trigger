trigger AccountsTrigger on Account (before insert, before update) {
    fflib_SObjectDomain.triggerHandler(
        new Map<SObjectType, fflib_SObjectDomain.IConstructable> {
            Account.SObjectType => new Accounts.Constructor()
        }
    );
}
