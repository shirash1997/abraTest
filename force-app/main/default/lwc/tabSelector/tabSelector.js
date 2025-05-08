import { LightningElement, api } from 'lwc';

export default class TabSelector extends LightningElement {
  @api activeTab;

  getTabClass(tab) {
    return this.activeTab === tab ? 'tab-button active' : 'tab-button';
  }

  handleClickEvening() {
    this.dispatchEvent(new CustomEvent('tabchange', { detail: 'evening' }));
  }

  handleClickDessert() {
    this.dispatchEvent(new CustomEvent('tabchange', { detail: 'dessert' }));
  }

  handleClickWine() {
    this.dispatchEvent(new CustomEvent('tabchange', { detail: 'wine' }));
  }
}
