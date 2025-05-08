import { LightningElement, track } from 'lwc';
import StylesOrderGroup from '@salesforce/resourceUrl/StylesOrderGroup';
import { loadStyle } from 'lightning/platformResourceLoader';

export default class GroupOrderPage extends LightningElement {
  @track customerName = '';
  @track activeTab = 'evening'; // options: 'evening', 'dessert', 'wine'
  @track orders = [];

  connectedCallback(){
    loadStyle(this, StylesOrderGroup);
    console.log(StylesOrderGroup);
    
}
  handleNameChange(event) {
    this.customerName = event.target.value;
  }

  handleTabChange(event) {
    this.activeTab = event.detail;
  }

  handleAddItem(event) {
    const { dishName, price } = event.detail;

    if (!this.customerName || !dishName) {
      alert('יש להזין שם ולבחור מנה');
      return;
    }

    const newItem = {
      id: Date.now(),
      name: this.customerName,
      dish: dishName,
      price: price
    };

    this.orders = [...this.orders, newItem];
  }

  handleResetOrders() {
    this.orders = [];
  }
}
