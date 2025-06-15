import { LightningElement, track } from 'lwc';
import getSObjects from '@salesforce/apex/SmartListViewController.getSObjects';
import getFieldsWithParents from '@salesforce/apex/SmartListViewController.getFieldsWithParents';
import getRecords from '@salesforce/apex/SmartListViewController.getRecords';

export default class SmartListView extends LightningElement {
  @track objectOptions = [];
  @track selectedObject = '';
  @track displayFields = [];
  @track selectedFields = [];
  @track columns = [];
  @track records = [];
  @track isModalOpen = false;

  connectedCallback() {
    getSObjects().then(data => {
      this.objectOptions = data.map(obj => ({
        label: obj,
        value: obj
      }));
    }).catch(error => {
      console.error('שגיאה בהבאת רשימת האובייקטים:', error);
    });
  }

  handleObjectChange(event) {
    this.selectedObject = event.detail.value;
    this.selectedFields = [];
    this.records = [];
    this.columns = [];
  }

  openFieldModal() {
    getFieldsWithParents({ objectName: this.selectedObject }).then(fields => {
      this.displayFields = fields;
      this.isModalOpen = true;
    }).catch(error => {
      console.error('שגיאה בטעינת שדות:', error);
    });
  }

  closeModal() {
    this.isModalOpen = false;
  }

  handleToggleField(event) {
    const field = event.target.dataset.id;
    if (event.target.checked) {
      if (!this.selectedFields.includes(field)) {
        this.selectedFields.push(field);
      }
    } else {
      this.selectedFields = this.selectedFields.filter(f => f !== field);
    }
  }

  applySelectedFields() {
    this.columns = this.selectedFields.map(f => ({
      label: f,
      fieldName: f
    }));
    getRecords({
      objectName: this.selectedObject,
      fields: this.selectedFields
    }).then(data => {
      this.records = data;
      this.isModalOpen = false;
    }).catch(error => {
      console.error('שגיאה בטעינת רשומות:', error);
    });
  }
}
