import { LightningElement, api, track } from 'lwc';

export default class MenuSection extends LightningElement {
  @api tab; // 'evening' | 'dessert' | 'wine'
  @track selectedItems = [];

  // כל המנות בתוך הקומפוננטה
  eveningMenu = {
    starters: [
      { label: "טונה צרובה ואבוקדו", price: 88 },
      { label: "קרפצ'יו פילה בקר", price: 79 },
      { label: "ברוסקטות סלמון", price: 82 },
      { label: "פטה כבדים", price: 88 },
      { label: "טארט טאטן כבד אווז", price: 92 },
      { label: "קונפיז BRENER סטייל", price: null }, // אין מחיר בתפריט
      { label: "סיגר במילוי פטריות, תמר וחמוציות", price: 76 }
    ],
    breads: [
      { label: "לחם הבית", price: 26 },
      { label: "טחינה", price: 8 },
      { label: "פלטת חריפים", price: 28 }
    ],
    salads: [
      { label: "סלט עוף ואבוקדו", price: 86 },
      { label: "סלט עגבניות", price: 76 },
      { label: "סלט ניסואז", price: 86 }
    ],
    grill: [
      { label: "אנטריקוט 300 גרם", price: 195 },
      { label: "פירורים ריב 100 גרם", price: 78 },
      { label: "פילה בקר ברוטב יין אדום וצלוי בשר 250 גרם", price: 238 },
      { label: "פילה רוסיני", price: 278 },
      { label: "שייטת 200 גרם", price: 228 }
    ],
    sandwiches: [
      { label: "כריך פורטובלו", price: 82 },
      { label: "כריך עוף צלוי", price: 84 },
      { label: "כריך אנטריקוט", price: 98 }
    ],
    dishs: [
      { label: "שניצל עוף", price: 86 },
      { label: "חצי עוף צלוי", price: 98 },
      { label: "כבד עוף", price: 89 },
      { label: "קציצות ירקות צבעוניות", price: 84 },
      { label: "סטייק טונה (200 גרם)", price: 166 },
      { label: "פילה סלמון צרוב", price: 128 },
      { label: "פילה לבנוק", price: 148 },
      { label: "דג ים שלם", price: null } // שאל את המלצר
    ],
    pasta: [
      { label: "לינגוויני ארטישוק", price: 86 },
      { label: "בולונז", price: 92 },
      { label: "פפרדלה פילה בקר", price: 139 },
      { label: "ניוקי שקדיה עגל ופרגית", price: 132 }
    ],
    hamburgers: [
      { label: "המבורגר קלאסי", price: 89 },
      { label: "המבורגר KAZAN", price: 98 },
      { label: "המבורגר נייקון טלה", price: 96 },
      { label: "המבורגר רוסיני", price: 164 }
    ],
    sideDishes: [
      { label: "צ'יפס / פירה / סלט ירוק / ירקות שורש / ירקות ירוקים צלויים", price: 26 }
    ],
    drinkMenu: [
      // Hot Drinks
      { label: "אספרסו קצר / ארוך", price: 14 },
      { label: "אספרסו כפול", price: 15 },
      { label: "קפה שחור", price: 14 },
      { label: "תה יסמין / ארל גריי / תה נענע", price: 15 },
    
      // Beer Bottle
      { label: "מכבי 7.9%", price: 36 },
      { label: "שפרה IPA", price: 38 },
      { label: "ויינשטפן", price: 38 },
    
      // Draft Beer
      { label: "גולדסטאר", price: 32 }, // כנראה יש כוס/חצי, בחרתי הנמוך
      { label: "מוֹנְטי", price: 36 },
    
      // Cocktails
      { label: "מרגריטה קזן", price: 62 },
      { label: "ג'ינג'ר מוחיטו", price: 62 },
      { label: "ספייסי מרגריטה", price: 62 },
      { label: "קזן ג'ולפ", price: 58 },
      { label: "פיץ' אפרול", price: 62 },
      { label: "בלונד קוסמו", price: 58 },
      { label: "ויולט K", price: 62 },
    
      // Classic Cocktails
      { label: "ראסטי נייל", price: 62 },
      { label: "מוסקו מיול", price: 62 },
      { label: "בלאדי מרי", price: 62 },
      { label: "קוסמופוליטן", price: 62 },
    
      // Soft Drinks
      { label: "קוקה קולה", price: 19 },
      { label: "דיאט קולה", price: 19 },
      { label: "קולה זירו", price: 19 },
      { label: "ספרייט ליים", price: 19 },
      { label: "ספרייט זירו ליים", price: 19 },
      { label: "פיוז תה", price: 19 },
      { label: "אקווה פנה", price: 35 },
      { label: "סאן בנדטו, מים מינרליים", price: 16 },
      { label: "סאן פלגרינו קטן", price: 18 },
      { label: "סאן פלגרינו גדול", price: 35 },
      { label: "נסטי לימון", price: 20 },
      { label: "טוניק", price: 20 },
      { label: "ג'ינג'ר אייל", price: 20 },
      { label: "לימונדה", price: 20 },
      { label: "אשכולית", price: 20 },
      { label: "תפוזים", price: 20 }
    ]
  };


  dessertMenu = [
    { label: 'פאי לימון', price: 34 },
    { label: 'עוגת גבינה ניו-יורקית', price: 36 },
    { label: 'שוקולד חם ומריר', price: 32 },
    { label: 'מאפה תפוחים חם', price: 36 }
  ];

  wineMenu = [
    { label: "קאווא, ספרד", price: 42 },
    { label: "למברוסקו, קוה די ואלי", price: 42 },
    { label: "רוזה בראנץ', פלדשטיין", price: 58 },
    { label: "זינפנדל, ברון הרצוג", price: 46 },
    { label: "סנט בירטריס, פרובנס", price: 52 },
    { label: "רוסאן, פלדשטיין", price: 56 },
    { label: "וייט פרנק, טוליפ", price: 56 },
    { label: "גוורצטרמינר, ירדן", price: 58 },
    { label: "שרדונה כרם אורגני אדום, ירדן", price: 59 },
    { label: "מוסקטו, ברטנורא", price: 52 },
    { label: "פטיט סירה, סגל", price: 54 },
    { label: "ריחואלה, רמון קזרובה", price: 56 },
    { label: "מחול הכרמים, בנימינה", price: 58 },
    { label: "מרלו, ירדן, רמת הגולן", price: 62 },
    { label: "קברנה סוביניון, ירדן רמת הגולן", price: 72 }
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
