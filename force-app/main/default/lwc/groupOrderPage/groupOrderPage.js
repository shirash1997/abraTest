import { LightningElement, track } from 'lwc';
import StylesOrderGroup from '@salesforce/resourceUrl/StylesOrderGroup';
import { loadStyle } from 'lightning/platformResourceLoader';

import getOrders from '@salesforce/apex/GroupOrderController.getOrders';
import saveOrders from '@salesforce/apex/GroupOrderController.saveOrders';

export default class GroupOrderPage extends LightningElement {
  @track customerName = '';
  @track activeTab = 'evening';
  @track orders = [];

  connectedCallback() {
    loadStyle(this, StylesOrderGroup);
    this.fetchOrders(); // שליפה ידנית בעת עליית הקומפוננטה
  }

  fetchOrders() {
    getOrders()
      .then(data => {
        this.orders = data.map(o => ({
          id: o.Id,
          name: o.Name,
          dish: o.Dish__c,
          price: o.Price__c
        }));
      })
      .catch(error => {
        console.error('שגיאה בשליפת ההזמנות:', error);
        alert('אירעה שגיאה בעת שליפת ההזמנות');
      });
  }

  handleNameChange(event) {
    this.customerName = event.target.value;
  }

  handleTabChange(event) {
    this.activeTab = event.detail;
  }

  async handleRequestSubmit(event) {
    const items = event.detail;

    if (!this.customerName || this.customerName.trim() === '') {
      alert('יש להזין שם לפני שליחת ההזמנה');
      return;
    }

    if (!items.length) {
      alert('יש לבחור לפחות מנה אחת להזמנה');
      return;
    }

    try {
        console.log('הזמנה נשלחה:', JSON.stringify(items));
        await saveOrders(
            this.customerName,
            items.map(i => ({
              dish: i.label,
              price: i.price
            }))
          );
          
      this.fetchOrders(); // שליפה מחדש לאחר שמירה
    } catch (error) {
      console.error('שגיאה בשמירה:', error);
      alert('אירעה שגיאה בשמירת ההזמנה, נסו שוב מאוחר יותר');
    }
  }

  handleResetOrders() {
    // זה איפוס מקומי בלבד – נפרד אם תרצי גם Apex למחיקה מלאה
    this.orders = [];
  }
}
