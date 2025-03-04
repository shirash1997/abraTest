public class AccountsSelector extends fflib_SObjectSelector {
    // Provide the list of fields for the Account object
    public List<Schema.SObjectField> getSObjectFieldList() {
        return new List<Schema.SObjectField>{
            Account.Name,
            Account.Description,
            Account.AnnualRevenue
        };
    }

    // Provide the SObjectType for Account
    public Schema.SObjectType getSObjectType() {
        return Account.SObjectType;
    }

    // Selector method to fetch Accounts by Id
    public List<Account> selectById(Set<Id> idSet) {
        return (List<Account>) selectSObjectsById(idSet);
    }
}
