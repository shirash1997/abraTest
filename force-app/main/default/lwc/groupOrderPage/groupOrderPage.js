import { LightningElement, track } from 'lwc';
import StylesOrderGroup from '@salesforce/resourceUrl/StylesOrderGroup';
import { loadStyle } from 'lightning/platformResourceLoader';
import getOrders from '@salesforce/apex/GroupOrderController.getOrders';
import saveOrders from '@salesforce/apex/GroupOrderController.saveOrders';

export default class GroupOrderPage extends LightningElement {
  @track customerName = '';
  @track activeTab = 'evening';
  @track orders = [];
  @track showSummaryOnly = false;

  connectedCallback() {
    loadStyle(this, StylesOrderGroup);
    this.fetchOrders();
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

  scrollToSummary() {
    this.showSummaryOnly = true;
  }

  backToMenu() {
    this.showSummaryOnly = false;
  }

  handleTabChange(event) {
    this.activeTab = event.detail;
  }

  handleRequestSubmit(event) {
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

    saveOrders({ name: this.customerName, items: payload }).then(() => {
      console.log('✅ ההזמנה נשמרה בהצלחה');
      this.fetchOrders();
      this.showSummaryOnly = true;
    });
  }

  handleResetOrders() {
    this.orders = [];
  }
}
