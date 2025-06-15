import { LightningElement, track } from 'lwc';
import getSObjects from '@salesforce/apex/SmartListViewController.getSObjects';
import getFieldsWithParents from '@salesforce/apex/SmartListViewController.getFieldsWithParents';
import getRecords from '@salesforce/apex/SmartListViewController.getRecords';

export default class SmartListView extends LightningElement {
  @track objectOptions = [];
  @track selectedObject = '';
  @track rawFields = [];            // תוצאת Apex מקורית
  @track preparedFields = [];       // שדות לעבודה ב־HTML
  @track selectedFields = [];       // שדות שנבחרו בפועל
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
    getFieldsWithParents({ objectName: this.selectedObject })
      .then(fields => {
        this.rawFields = fields;
        this.buildPreparedFields();
        this.isModalOpen = true;
      }).catch(error => {
        console.error('שגיאה בטעינת שדות:', error);
      });
  }

  buildPreparedFields() {
    let flatFields = [];

    this.rawFields.forEach(field => {
      flatFields.push({
        label: field.label,
        fullValue: field.value,
        checked: this.selectedFields.includes(field.value)
      });

      if (field.isReference && field.childFields) {
        field.childFields.forEach(child => {
          const full = `${field.value}.${child.value}`;
          flatFields.push({
            label: `↳ ${child.label}`,
            fullValue: full,
            checked: this.selectedFields.includes(full)
          });
        });
      }
    });

    this.preparedFields = flatFields;
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

    // עדכון הבידוי (checkbox) של הרשימה
    this.buildPreparedFields();
  }

  closeModal() {
    this.isModalOpen = false;
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
