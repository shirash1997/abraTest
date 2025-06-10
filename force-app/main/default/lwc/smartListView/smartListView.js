import { LightningElement, track } from 'lwc';

export default class SmartListView extends LightningElement {
  @track isModalOpen = false;
  @track columns = [];
  @track records = [];

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  handleFieldSelected(event) {
    const selectedFields = event.detail; // Array of fields
    this.columns = selectedFields.map(f => ({
      label: f.label,
      fieldName: f.apiName,
      type: 'text'
    }));

    // TODO: fetch records from Apex using selected fields
    this.records = [
      { Id: '001', Name: 'Opportunity A', StageName: 'Prospecting' },
      { Id: '002', Name: 'Opportunity B', StageName: 'Closed Won' }
    ];

    this.isModalOpen = false;
  }
}
