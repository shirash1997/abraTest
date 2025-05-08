import { LightningElement, api, track } from 'lwc';

export default class MenuSection extends LightningElement {
  @api tab; // 'evening' | 'dessert' | 'wine'
  @track selectedItems = [];

  // כל המנות בתוך הקומפוננטה
  eveningMenu = [
    { label: 'קרם חצילים עם טחינה מעושנת', price: 38 },
    { label: 'כרוב צלוי בטאבון', price: 42 },
    { label: 'טרטר דג ים', price: 54 },
    { label: 'סשימי טונה אדומה', price: 58 },
    { label: 'פסטה ארטישוק לימון', price: 68 },
    { label: 'ריזוטו פטריות וערמונים', price: 74 },
    { label: 'עוף בגריל עם בטטה', price: 82 },
    { label: 'דג ים בגריל', price: 96 }
  ];

  dessertMenu = [
    { label: 'פאי לימון', price: 34 },
    { label: 'עוגת גבינה ניו-יורקית', price: 36 },
    { label: 'שוקולד חם ומריר', price: 32 },
    { label: 'מאפה תפוחים חם', price: 36 }
  ];

  wineMenu = [
    { label: 'שרדונה גולן', price: 110 },
    { label: 'סוביניון בלאן ירדן', price: 112 },
    { label: 'קברנה יקב הרי גליל', price: 125 },
    { label: 'רוזה דומיין דו קוסט', price: 118 },
    { label: 'קאווה רוזה', price: 105 }
  ];

  get menuOptions() {
    switch (this.tab) {
      case 'evening': return this.eveningMenu;
      case 'dessert': return this.dessertMenu;
      case 'wine': return this.wineMenu;
      default: return [];
    }
  }

  handleAdd(event) {
    const label = event.target.dataset.label;
    const menu = this.menuOptions;
    const item = menu.find(m => m.label === label);
  
    if (item) {
      this.selectedItems = [
        ...this.selectedItems,
        {
          id: Date.now() + Math.random(),
          label: item.label,
          price: item.price
        }
      ];
    }
  }
  

  handleRemove(event) {
    const id = event.target.dataset.id;
    this.selectedItems = this.selectedItems.filter(i => i.id != id);
  }

  handleSubmit() {
    if (this.selectedItems.length === 0) {
      alert('נא לבחור לפחות מנה אחת');
      return;
    }

    this.selectedItems.forEach(item => {
      this.dispatchEvent(
        new CustomEvent('additem', {
          detail: {
            dishName: item.label,
            price: item.price
          }
        })
      );
    });
    console.log('Selected items:', this.selectedItems);
    this.dispatchEvent(
        new CustomEvent('requestsubmit', {
          detail: this.selectedItems
        })
      );
    this.selectedItems = [];
  }
}
