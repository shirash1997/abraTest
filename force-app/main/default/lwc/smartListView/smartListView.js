import { LightningElement, track } from 'lwc';
import getSObjects from '@salesforce/apex/SmartListViewController.getSObjects';
import getFields from '@salesforce/apex/SmartListViewController.getFields';
import getRecords from '@salesforce/apex/SmartListViewController.getRecords';

export default class SmartListView extends LightningElement {
  @track objectOptions = [];
  @track selectedObject = '';
  @track fieldOptions = [];
  @track selectedFields = [];
  @track columns = [];
  @track records = [];

  connectedCallback() {
    getSObjects().then(data => {
      this.objectOptions = data.map(obj => ({
        label: obj,
        value: objַ
      }));
    });
  }

  handleObjectChange(event) {
    this.selectedObject = event.detail.value;
    this.selectedFields = [];
    this.records = [];

    getFields({ objectName: this.selectedObject }).then(fields => {
      this.fieldOptions = fields.map(f => ({ label: f, value: f }));
    });
  }

  handleFieldSelection(event) {
    this.selectedFields = event.detail.value;
    this.columns = this.selectedFields.map(field => ({
      label: field,
      fieldName: field
    }));

    getRecords({ objectName: this.selectedObject, fields: this.selectedFields }).then(data => {
      this.records = data;
    });
  }
}
