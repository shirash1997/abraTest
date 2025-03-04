@IsTest
private class UnitOfWorkTest {
    @IsTest
    static void challengeComplete() {
        // Create Unit of Work instance
        fflib_SObjectUnitOfWork uow = new fflib_SObjectUnitOfWork(
            new Schema.SObjectType[] {
                Account.SObjectType,
                Contact.SObjectType
            }
        );

        // Register Accounts and Contacts
        List<Account> accounts = new List<Account>();
        List<Contact> contacts = new List<Contact>();

        for (Integer i = 0; i < 100; i++) {
            Account acc = new Account(Name = 'Test Account ' + i);
            uow.registerNew(acc);
            accounts.add(acc);

            for (Integer j = 0; j < 5; j++) {
                Contact con = new Contact(LastName = 'Test Contact ' + j, AccountId = acc.Id);
                uow.registerNew(con);
                contacts.add(con);
            }
        }

        // Commit Accounts and Contacts
        uow.commitWork();

        // Register Notes
        fflib_SObjectUnitOfWork noteUow = new fflib_SObjectUnitOfWork(new Schema.SObjectType[] { Note.SObjectType });

        for (Contact con : contacts) {
            Note note = new Note(
                Title = 'Test Note for ' + con.LastName,
                Body = 'Sample body content.',
                ParentId = con.Id
            );
            noteUow.registerNew(note);
        }

        // Commit Notes
        noteUow.commitWork();

        // Assertions
        System.assertEquals(100, [SELECT Id FROM Account].size(), 'Accounts count mismatch');
        System.assertEquals(500, [SELECT Id FROM Contact].size(), 'Contacts count mismatch');
        System.assertEquals(500, [SELECT Id FROM Note].size(), 'Notes count mismatch');
    }
}