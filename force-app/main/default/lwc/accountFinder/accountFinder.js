import { LightningElement, wire } from 'lwc';
import queryAccountsByRevenue from '@salesforce/apex/AccountListControllerLwc.queryAccountsByRevenue';

export default class AccountFinder extends LightningElement {
    annualRevenue = null;
    accounts;
    handleChange(event) {
        // Use the `event.detail.value` to get the value from the change event
        this.annualRevenue = event.detail.value;
    }

    reset() {
        this.annualRevenue = null;
        this.accounts = null;

    }

    @wire(queryAccountsByRevenue, { annualRevenue: '$annualRevenue' })
    wiredAccounts({ error, data }) {
        if (data) {
            this.accounts = data;
        } else if (error) {
            this.accounts = null;
            console.error('Error fetching accounts: ', error);
        }
    }

}
