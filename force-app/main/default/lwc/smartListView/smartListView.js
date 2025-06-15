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
    const isParentChecked = this.selectedFields.includes(field.value);

    // שדה רגיל או Parent
    flatFields.push({
      label: field.label,
      fullValue: field.value,
      checked: isParentChecked,
      cssClass: '', // שדה רגיל – אין הזחה
    });

    // שדות Child – רק אם ה־Parent נבחר
    if (field.isReference && isParentChecked && field.childFields) {
      field.childFields.forEach(child => {
        const full = `${field.value}.${child.value}`;
        flatFields.push({
          label: `↳ ${child.label}`,
          fullValue: full,
          checked: this.selectedFields.includes(full),
          cssClass: 'slds-m-left_medium' // הזחה שמאלה ל־child
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
  const fieldMap = {}; // מיפוי מהשדה המקורי לשם שטוח
  this.selectedFields.forEach(f => {
    // החלפה של "." ב־"__" – כדי שזה יעבוד בדאטה־טייבל
    const flatName = f.replace(/\./g, '__');
    fieldMap[f] = flatName;
  });

  getRecords({
    objectName: this.selectedObject,
    fields: this.selectedFields
  }).then(data => {
    // המרת הנתונים לפורמט שטוח
    this.records = data.map(row => {
      let flat = { Id: row.Id };
      this.selectedFields.forEach(original => {
        const flatFieldName = fieldMap[original];

        if (original.includes('.')) {
          const [parent, child] = original.split('.');
          flat[flatFieldName] = row[parent]?.[child] || null;
        } else {
          flat[flatFieldName] = row[original];
        }
      });
      return flat;
    });

    // הגדרת העמודות בצורה שטוחה
    this.columns = this.selectedFields.map(original => ({
      label: original,
      fieldName: fieldMap[original],
      type: 'text'
    }));

    this.isModalOpen = false;
  }).catch(error => {
    console.error('❌ שגיאה בטעינת רשומות:', error);
  });
}


}
