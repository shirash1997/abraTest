import { LightningElement, api, track } from 'lwc';

export default class MenuSection extends LightningElement {
  @api tab; // 'evening' | 'dessert' | 'wine'
  @track selectedItems = [];
  manualPrices = {};
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
      { label: "גולדסטאר", price: 32 },
      { label: "גולדסטאר (גדול)", price: 36 },
      { label: "מורטי", price: 36 },
      { label: "מורטי (גדול)", price: 42 },
    
    
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
  { label: "נגרוני", price: 62 },
  { label: "בלאדי מרי", price: 62 },
  { label: "קוסמופוליטן", price: 62 },
  { label: "מוחיטו", price: 62 },

  // Soft Drinks
  { label: "קוקה קולה", price: 19 },
  { label: "דיאט קוקה קולה", price: 19 },
  { label: "קולה זירו", price: 19 },
  { label: "ספרייט ליים", price: 19 },
  { label: "ספרייט זירו ליים", price: 19 },
  { label: "פיוז תה", price: 19 },
  { label: "אקווה פנה", price: 35 },
  { label: "סן בנדטו, מים מינרליים", price: 16 },
  { label: "סן פלגרינו קטן", price: 18 },
  { label: "סן פלגרינו גדול", price: 35 },
  { label: "נסטי לימון", price: 20 },
  { label: "טוניק", price: 20 },
  { label: "ג'ינג'ר אייל", price: 20 },
  { label: "לימונדה", price: 20 },
  { label: "אשכולית", price: 20 },
  { label: "תפוזים", price: 20 }
]
  };


  dessertMenu = [
    { label: "שכבות קדז’ף", price: 54 },
    { label: "פארי שוקולד", price: 59 },
    { label: "פחזניות אננס", price: 58 },
    { label: "מוס שוקולד VALRHONA", price: 59 },
    { label: "סלוף פיסטוק", price: 52 },
    { label: "פנקוטה מיכל", price: 59 },
  
    // Digestif (עיכול)
    { label: "לימונצ'לו", price: 38 },
    { label: "סמבוקה", price: 42 },
    { label: "פרנו אמריקנו", price: 38 },
    { label: "ראפאה", price: 38 },
    { label: "ז'ידאן דה גז’יל", price: 42 },
    { label: "קוניאק קורווזיה XO", price: 175 }
  ];

  wineMenu = [
    // יינות לבנים
    { label: "שרדונה קברנה גבעות", price: 195 },
    { label: "שנין בלאן מטר פלטר", price: 240 },
    { label: "שרדונה כרם אורגני עין אודם ירדן", price: 195 },
    { label: "שרדונה קצרין ירדן", price: 265 },
    { label: "שבלי דומיין סן פרי צרפת", price: 320 },
    { label: "סוביניון בלאן אדם תבור", price: 165 },
    { label: "פלם בלאן פלם", price: 240 },
    { label: "סוביניון בלאן גוס ביי ניו זילנד", price: 280 },
    { label: "סוביניון בלאן ירדן", price: 240 },
    { label: "מוסקטו ירדן רמת הגולן", price: 160 },
    { label: "וייט פרנק טוליפ", price: 185 },
    { label: "גוורצטרמינר ירדן", price: 185 },
    { label: "ריזלינג בטא ברקן", price: 220 },
    { label: "מוסקטו טוליפ", price: 165 },
  
    // יינות רוזה
    { label: "רוזה סנט ביאטריס", price: 220 },
    { label: "זינפנדל ברון הרצוג ארה\"ב", price: 165 },
    { label: "גרי דה מרסלאן רקנאטי", price: 210 },
    { label: "רוזה קסטל דומיין דו קסטל", price: 280 },
    { label: "רוזה מדמוזל", price: 320 },
    { label: "וין גרי בטא ברקן", price: 220 },
    { label: "רוזה ירדן", price: 240 },
  
    // יינות מבעבעים
    { label: "למברוסקו קה די ואלי איטליה", price: 140 },
    { label: "קאווה איבריקה ספרד", price: 140 },
    { label: "רוזה ברוט הרצוג סלקשן ארה\"ב", price: 240 },
    { label: "בלנק דה בלאן ירדן רמת הגולן", price: 280 },
    { label: "רוזה לורן פרייה", price: 975 },
    { label: "שמפניה ברון רוטשילד", price: 1350 },
  
    // יינות אדומים
    { label: "שורש צרעה", price: 298 },
    { label: "קומולוס מטר פלטר", price: 240 },
    { label: "פטיט קסטל דומיין דו קסטל", price: 260 },
    { label: "יראון הרי גליל", price: 245 },
    { label: "בלק טוליפ טוליפ", price: 420 },
    { label: "מחול הכרמים גבעות", price: 195 },
    { label: "אדום פסגות", price: 260 },
    { label: "פלם קלאסיקו מלם", price: 250 },
    { label: "טמפרניו רמון קורדובה ריוחה ספרד", price: 196 },
    { label: "סירה מיה לוצה", price: 335 },
    { label: "מרסלאן תבור", price: 240 },
    { label: "פטיט ורדו מטר פלטר", price: 320 },
    { label: "פינו נואר ירדן רמת הגולן", price: 245 },
    { label: "סירה אשכולות שלמים סגל", price: 255 },
    { label: "פטיט סירה רזרב רקנאטי", price: 245 },
    { label: "סירה ירדן", price: 258 },
  
    // קברנה מרלו יחד ולחוד
    { label: "קברנה סוביניון סופריור ברקן", price: 425 },
    { label: "קברנה סוביניון פלטינום ברקן", price: 245 },
    { label: "קברנה מרלו גמלא השמורה רמת הגולן", price: 165 },
    { label: "מרלו ירדן רמת הגולן", price: 205 },
    { label: "קלאסיקו פלם", price: 255 },
    { label: "מרלו רזרב רקנאטי", price: 245 },
    { label: "קברנה סוביניון פטיט יו אף סגל", price: 260 },
    { label: "קברנה סוביניון ירדן", price: 265 },
    { label: "מרלו כרם אלונה הבשן ירדן", price: 385 },
  
    // מהמרתקים והחשובים שלנו
    { label: "או מדוק ברון דה רוטשילד בורדו", price: 420 },
    { label: "מיסטי הילס צרעה", price: 520 },
    { label: "גראנד וין דומיין דו קסטל", price: 495 },
    { label: "מצדה גבעות", price: 380 },
    { label: "ספיישל רזרב רקנאטי", price: 395 },
    { label: "פבילון דה לויל פוייפרה", price: 975 },
    { label: "שאטו מולין ריץ'", price: 985 },
    { label: "שאטו לויל פוייפרה", price: 2480 },
    { label: "שאטו גיסקור מרגו", price: 2850 },
    { label: "קצרין ירדן", price: 1350 }
  
  
  ];

  get menuCategories() {
    if (this.tab === 'evening') {
      return Object.entries(this.eveningMenu); // [['starters', [...]], ['breads', [...]], ...]
    }
    // קינוחים ויין נשארים שטוחים
    return [['default', this.tab === 'dessert' ? this.dessertMenu : this.wineMenu]];
  }
  get processedMenu() {
    // אם זה תפריט ערב, נחלק לקטגוריות
    if (this.tab === 'evening') {
      return Object.entries(this.eveningMenu).map(([key, items]) => ({
        key,
        label: this.getCategoryLabel(key),
        items
      }));
    }
  
    // אחרת - קינוחים או יין - בלי חלוקה
    const label = this.tab === 'dessert' ? 'קינוחים' : 'יינות';
    return [{
      key: 'default',
      label,
      items: this.tab === 'dessert' ? this.dessertMenu : this.wineMenu
    }];
  }
  
  getCategoryLabel(key) {
    const labels = {
      starters: 'ראשונות',
      breads: 'לחמים',
      salads: 'סלטים',
      grill: 'מהגריל',
      sandwiches: 'כריכים',
      dishs: 'עיקריות',
      pasta: 'פסטות',
      hamburgers: 'המבורגרים',
      sideDishes: 'תוספות',
      drinkMenu: 'שתייה',
      default: ''
    };
    return labels[key] || key;
  }


  handlePriceInput(event) {
    const label = event.target.dataset.label;
    const value = parseFloat(event.target.value);
    if (!isNaN(value)) {
      this.manualPrices[label] = value;
    }
  }


  
handleAddWithManualPrice(event) {
  const label = event.target.dataset.label;
  const price = this.manualPrices[label];

  if (!price) {
    alert('יש להזין מחיר תקין למנה זו');
    return;
  }

  this.selectedItems = [
    ...this.selectedItems,
    {
      id: Date.now() + Math.random(),
      label,
      price
    }
  ];
}

  handleAdd(event) {
    const label = event.target.dataset.label;
  
    // איחוד כל המנות מכל הקטגוריות
    const allItems = this.processedMenu.flatMap(category => category.items);
    const item = allItems.find(i => i.label === label);
  
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

  get totalPrice() {
    return this.selectedItems.reduce((sum, i) => sum + (i.price || 0), 0);
  }
  
  scrollToBottom() {
    const summaryEl = this.template.querySelector('.submit-button');
    if (summaryEl) {
      summaryEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
