import { LightningElement, track } from 'lwc';

export default class FieldSelector extends LightningElement {
  @track fieldList = [
    { apiName: 'Name', label: 'Opportunity Name', selected: false },
    { apiName: 'StageName', label: 'Stage', selected: false },
    { apiName: 'CloseDate', label: 'Close Date', selected: false },
    { apiName: 'Amount', label: 'Amount', selected: false },
    { apiName: 'Account.Name', label: 'Account Name (Lookup)', selected: false }
  ];

  handleToggle(event) {
    const id = event.target.dataset.id;
    this.fieldList = this.fieldList.map(f => {
      return f.apiName === id ? { ...f, selected: event.target.checked } : f;
    });
  }

  handleCancel() {
    this.dispatchEvent(new CustomEvent('close'));
  }

  handleSelect() {
    const selectedFields = this.fieldList.filter(f => f.selected);
    this.dispatchEvent(new CustomEvent('fieldselected', {
      detail: selectedFields
    }));
  }
}