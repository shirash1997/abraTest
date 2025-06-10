import { LightningElement, track } from 'lwc';

export default class SmartListView extends LightningElement {
  @track isModalOpen = false;
  @track columns = [];
  @track records = []; // בהמשך: נשלוף דינאמית מ-Apex

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
    this.isModalOpen = false;
  }
}
