public with sharing class accountController {
    public List<AccountWrapper> accountWrappers { get; set; }
    public List<Account> selectedAccounts { get; set; }

    public accountController() {
        this.selectedAccounts = new List<Account>();
        this.accountWrappers= new List<AccountWrapper>();

        List<Account> accounts=[select Id from Account];

        //populated the wrapper
        for(Account acc:accounts){
            accountWrappers.add(new accountWrapper(acc));
        }
    }

    public void selectedAccounts(){
        selectedAccounts.clear();
        for(accountWrapper acc:accountWrappers){
            if(wrapper.isSelected)
            selectedAccounts.addAll(wrapper.acc);
        }
    }
}