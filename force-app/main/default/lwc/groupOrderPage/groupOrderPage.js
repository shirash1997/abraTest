import { LightningElement, track } from 'lwc';
import StylesOrderGroup from '@salesforce/resourceUrl/StylesOrderGroup';
import { loadStyle } from 'lightning/platformResourceLoader';

// import getOrders from '@salesforce/apex/GroupOrderController.getOrders';
import saveOrders from '@salesforce/apex/GroupOrderController.saveOrders';

export default class GroupOrderPage extends LightningElement {
  @track customerName = '';
  @track activeTab = 'evening';
  @track orders = [];

  connectedCallback() {
    loadStyle(this, StylesOrderGroup);
    // this.fetchOrders(); // שליפת כל ההזמנות עם עליית הקומפוננטה
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

    const payload = items.map(i => ({
      dish: i.label,
      price: i.price
    }));

    console.log('הזמנה נשלחת:', JSON.stringify(payload));

    try {
      await saveOrders(this.customerName, payload);
      console.log('✅ ההזמנה נשמרה בהצלחה');
    //   this.fetchOrders(); // רענון ההזמנות לאחר שליחה
    } catch (error) {
      console.error('❌ שגיאה בשמירת ההזמנה:', error);
      alert('אירעה שגיאה בשמירת ההזמנה, נסו שוב מאוחר יותר');
    }
  }

  handleResetOrders() {
    this.orders = [];
  }
}
